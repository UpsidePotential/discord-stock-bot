import got from 'got';
import * as cheerio from 'cheerio';

export interface fa_num {
  pe: string;
  epsttm: string;
  mcap: string;
  fpe: string;
  epsnextq: string;
  ps: string;
  divi: string;
  pfcf: string;
  diviperc: string;
  salesqoq: string;
  epsqoq: string;
  erdate: string;
  week52_low: string;
  week52_high: string;
}

export const getCompanyFA = async (ticker: string): Promise<fa_num> => {
  const result = await got(`https://finviz.com/quote.ashx?t=${encodeURIComponent(ticker)}`);
  const $ = cheerio.load(result.body);

  // Build data map in a single pass
  const data: { [key: string]: string } = {};
  $('td').each((i, el) => {
    const label = $(el).text().trim();
    const nextCell = $(el).next();
    if (nextCell.length > 0) {
      const rawText = nextCell.find('b').length ? nextCell.find('b').text() : nextCell.text();
      data[label] = rawText.trim();
    }
  });

  // Extract field values from data map
  const getField = (label: string): string => {
    const rawText = data[label];
    if (!rawText) return '-';
    
    // For pure numeric fields, extract just the number part
    if (['P/E', 'EPS (ttm)', 'Forward P/E', 'EPS next Q', 'P/S', 'P/FCF', '52W Low', '52W High'].includes(label)) {
      const match = rawText.replace(/,/g, '').match(/-?\d+(\.\d+)?/);
      return match ? match[0] : '-';
    }
    
    return rawText || '-';
  };

  const fa_num = {
    pe: getField('P/E'),
    epsttm: getField('EPS (ttm)'),
    mcap: getField('Market Cap'),
    fpe: getField('Forward P/E'),
    epsnextq: getField('EPS next Q'),
    ps: getField('P/S'),
    divi: getField('Dividend Ex-Date'),
    pfcf: getField('P/FCF'),
    diviperc: getField('Dividend TTM'),
    salesqoq: getField('Sales Q/Q'),
    epsqoq: getField('EPS Q/Q'),
    erdate: getField('Earnings'),

    week52_low: getField('52W Low'),
    week52_high: getField('52W High'),
  };
  return fa_num;
};
