import got from 'got';
import * as cheerio from 'cheerio';

export interface ext {
  ExtendedHoursType: number;
  chg: number;
  pctChg: string;
  time: string;
  close: string;
}

export interface TickerInfo {
  symbol: string;
  latestTrade: string;
  extendedHours: ext;
}

export const getSymbolInfo = async (ticker: string): Promise<TickerInfo> => got(`https://stockcharts.com/j-sum/sum?cmd=symsum&symbol=${encodeURIComponent(ticker)}`).json();
