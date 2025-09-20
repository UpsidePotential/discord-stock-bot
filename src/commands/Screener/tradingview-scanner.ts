// ABOUTME: TradingView scanner API integration for premarket and after-hours stock data
// ABOUTME: Provides gainers, losers, and most active stocks using TradingView's official scanner endpoint

import got from 'got';

export interface TradingViewStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changeAbs: number;
  volume: number;
  marketCap: number;
  premarketChange?: number;
  premarketChangeAbs?: number;
  premarketClose?: number;
  premarketVolume?: number;
  postmarketChange?: number;
  postmarketChangeAbs?: number;
  postmarketClose?: number;
  postmarketVolume?: number;
  gap?: number;
}

export interface TradingViewData {
  gainers: TradingViewStock[];
  losers: TradingViewStock[];
  mostActive: TradingViewStock[];
  gappers?: TradingViewStock[];
  lastUpdated: string;
}

interface TradingViewResponse {
  totalCount: number;
  data: Array<{
    s: string;
    d: Array<string | number>;
  }>;
}

const parseNumber = (value: unknown, fallback: number = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

const validateApiResponse = (response: any): TradingViewResponse => {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid API response: not an object');
  }
  
  if (!Array.isArray(response.data)) {
    throw new Error('Invalid API response: data is not an array');
  }
  
  if (typeof response.totalCount !== 'number') {
    throw new Error('Invalid API response: totalCount is not a number');
  }
  
  return response as TradingViewResponse;
};

const parseDataItem = (item: { s: string; d: Array<string | number> }, expectedColumns: string[]): TradingViewStock | null => {
  try {
    if (!item.s || !Array.isArray(item.d)) {
      console.warn('Invalid data item: missing symbol or data array');
      return null;
    }
    
    if (item.d.length < 6) {
      console.warn(`Invalid data item: expected at least 6 columns, got ${item.d.length}`);
      return null;
    }
    
    const symbol = item.s.split(':')[1];
    if (!symbol) {
      console.warn(`Invalid symbol format: ${item.s}`);
      return null;
    }
    
    const [name, price, change, changeAbs, volume, marketCap, ...sessionData] = item.d;
    
    return {
      symbol,
      name: String(name || ''),
      price: parseNumber(price),
      change: parseNumber(change),
      changeAbs: parseNumber(changeAbs),
      volume: parseNumber(volume),
      marketCap: parseNumber(marketCap),
      sessionData // Store for session-specific parsing
    } as TradingViewStock & { sessionData: Array<string | number> };
  } catch (error) {
    console.warn('Error parsing data item:', error);
    return null;
  }
};

const getTradingViewData = async (
  sortBy: string,
  marketSession: 'premarket' | 'postmarket' | 'regular' = 'regular',
  sortOrder: 'desc' | 'asc' = 'desc',
  includeGap: boolean = false,
  marketCap: 'large' | 'mid' | 'all' = 'all'
): Promise<TradingViewStock[]> => {
  const sessionColumns = marketSession === 'premarket' 
    ? ['premarket_change', 'premarket_change_abs', 'premarket_close', 'premarket_volume']
    : marketSession === 'postmarket'
    ? ['postmarket_change', 'postmarket_change_abs', 'postmarket_close', 'postmarket_volume']
    : [];

  const columns = [
    'name',
    'close',
    'change',
    'change_abs',
    'volume',
    'market_cap_basic',
    ...sessionColumns,
    ...(includeGap ? ['gap'] : [])
  ];

  const baseFilters = [
    { left: 'type', operation: 'equal', right: 'stock' },
    { left: 'exchange', operation: 'in_range', right: ['NASDAQ', 'NYSE', 'AMEX'] },
    { left: 'close', operation: 'greater', right: 1 }
  ];

  // Add market cap filter if specified
  const marketCapFilters = [];
  if (marketCap === 'large') {
    marketCapFilters.push({ left: 'market_cap_basic', operation: 'greater', right: 10000000000 }); // > $10B
  } else if (marketCap === 'mid') {
    marketCapFilters.push(
      { left: 'market_cap_basic', operation: 'greater', right: 2000000000 }, // > $2B
      { left: 'market_cap_basic', operation: 'less', right: 10000000000 } // < $10B
    );
  }

  const payload = {
    filter: [...baseFilters, ...marketCapFilters],
    options: { lang: 'en' },
    symbols: { query: { types: ['stock'] }, tickers: [] as string[] },
    columns,
    sort: { sortBy, sortOrder },
    range: [0, 10]
  };

  try {
    const response = await got.post('https://scanner.tradingview.com/america/scan', {
      headers: {
        'Origin': 'https://www.tradingview.com',
        'Referer': 'https://www.tradingview.com/',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; Tooters/1.0)'
      },
      json: payload,
      timeout: { request: 10000 }
    }).json<any>();

    const validatedResponse = validateApiResponse(response);
    
    const stocks = validatedResponse.data
      .map(item => parseDataItem(item, columns))
      .filter((stock): stock is TradingViewStock & { sessionData: Array<string | number> } => stock !== null);

    return stocks.map(stock => {
      const result: TradingViewStock = {
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        change: stock.change,
        changeAbs: stock.changeAbs,
        volume: stock.volume,
        marketCap: stock.marketCap
      };

      const sessionData = (stock as any).sessionData || [];
      
      if (marketSession === 'premarket' && sessionData.length >= 4) {
        result.premarketChange = parseNumber(sessionData[0]);
        result.premarketChangeAbs = parseNumber(sessionData[1]);
        result.premarketClose = parseNumber(sessionData[2]);
        result.premarketVolume = parseNumber(sessionData[3]);
        
        if (includeGap && sessionData.length >= 5) {
          result.gap = parseNumber(sessionData[4]);
        }
      } else if (marketSession === 'postmarket' && sessionData.length >= 4) {
        result.postmarketChange = parseNumber(sessionData[0]);
        result.postmarketChangeAbs = parseNumber(sessionData[1]);
        result.postmarketClose = parseNumber(sessionData[2]);
        result.postmarketVolume = parseNumber(sessionData[3]);
      }

      return result;
    });
  } catch (error) {
    if (error.name === 'HTTPError') {
      throw new Error(`TradingView API error: ${error.response?.statusCode} ${error.response?.statusMessage}`);
    } else if (error.name === 'TimeoutError') {
      throw new Error('TradingView API request timeout');
    } else if (error.name === 'RequestError') {
      throw new Error('TradingView API network error');
    } else {
      throw new Error(`TradingView API error: ${error.message}`);
    }
  }
};

export const getPreMarketData = async (marketCap: 'large' | 'mid' | 'all' = 'all'): Promise<TradingViewData> => {
  try {
    const [gainers, gappers] = await Promise.all([
      getTradingViewData('premarket_change', 'premarket', 'desc', false, marketCap),
      getTradingViewData('gap', 'premarket', 'desc', true, marketCap) // Sort by gap for gappers
    ]);

    return {
      gainers: gainers || [],
      losers: [],
      mostActive: [],
      gappers: gappers || [],
      lastUpdated: new Date().toLocaleDateString()
    };
  } catch (error) {
    console.error('Error fetching premarket data:', error);
    throw new Error(`Failed to fetch premarket data: ${error.message}`);
  }
};

export const getAfterHoursData = async (marketCap: 'large' | 'mid' | 'all' = 'all'): Promise<TradingViewData> => {
  try {
    const [gainers, losersData] = await Promise.all([
      getTradingViewData('postmarket_change', 'postmarket', 'desc', false, marketCap),
      getTradingViewData('postmarket_change', 'postmarket', 'asc', false, marketCap) // Get losers in ascending order
    ]);

    // Get the actual losers (negative changes) from the ascending sort
    const losers = losersData.filter(stock => (stock.postmarketChange || 0) < 0).slice(0, 10);

    return {
      gainers: gainers || [],
      losers: losers || [],
      mostActive: [],
      lastUpdated: new Date().toLocaleDateString()
    };
  } catch (error) {
    console.error('Error fetching after-hours data:', error);
    throw new Error(`Failed to fetch after-hours data: ${error.message}`);
  }
};