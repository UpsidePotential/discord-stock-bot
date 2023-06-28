import got from 'got';
import * as cheerio from 'cheerio';

export interface fa_num {
  pe: string;
  epsttm: string;
  fpe: string;
  epsnextq: string;
  ps: string;
  divi: string;
  pfcf: string;
  diviperc: string;
  salesqoq: string;
  epsqoq: string;
  erdate: string;
}

export const getCompanyFA = async (ticker: string): Promise<fa_num> => {
  const result = await got(`https://finviz.com/quote.ashx?t=${encodeURIComponent(ticker)}`);
  const $ = cheerio.load(result.body);

  const fa_num = {
    pe: $('body > div.content > div.ticker-wrapper.gradient-fade > div.fv-container > table > tbody > tr > td > div > table:nth-child(1) > tbody > tr > td > div.snapshot-table-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(4) > b').text(),
    epsttm: $('body > div.content > div.ticker-wrapper.gradient-fade > div.fv-container > table > tbody > tr > td > div > table:nth-child(1) > tbody > tr > td > div.snapshot-table-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(6) > b').text(),

    fpe: $('body > div.content > div.ticker-wrapper.gradient-fade > div.fv-container > table > tbody > tr > td > div > table:nth-child(1) > tbody > tr > td > div.snapshot-table-wrapper > table > tbody > tr:nth-child(2) > td:nth-child(4)').text(),

    epsnextq: $('body > div.content > div.ticker-wrapper.gradient-fade > div.fv-container > table > tbody > tr > td > div > table:nth-child(1) > tbody > tr > td > div.snapshot-table-wrapper > table > tbody > tr:nth-child(3) > td:nth-child(6) > b').text(),

    ps: $('body > div.content > div.ticker-wrapper.gradient-fade > div.fv-container > table > tbody > tr > td > div > table:nth-child(1) > tbody > tr > td > div.snapshot-table-wrapper > table > tbody > tr:nth-child(4) > td:nth-child(4) > b').text(),

    divi: $('body > div.content > div.ticker-wrapper.gradient-fade > div.fv-container > table > tbody > tr > td > div > table:nth-child(1) > tbody > tr > td > div.snapshot-table-wrapper > table > tbody > tr:nth-child(7) > td:nth-child(2) > b').text(),
    pfcf: $('body > div.content > div.ticker-wrapper.gradient-fade > div.fv-container > table > tbody > tr > td > div > table:nth-child(1) > tbody > tr > td > div.snapshot-table-wrapper > table > tbody > tr:nth-child(7) > td:nth-child(4) > b').text(),

    diviperc: $('body > div.content > div.ticker-wrapper.gradient-fade > div.fv-container > table > tbody > tr > td > div > table:nth-child(1) > tbody > tr > td > div.snapshot-table-wrapper > table > tbody > tr:nth-child(8) > td:nth-child(2) > b').text(),
    salesqoq: $('body > div.content > div.ticker-wrapper.gradient-fade > div.fv-container > table > tbody > tr > td > div > table:nth-child(1) > tbody > tr > td > div.snapshot-table-wrapper > table > tbody > tr:nth-child(9) > td:nth-child(6) > b').text(),
    epsqoq: $('body > div.content > div.ticker-wrapper.gradient-fade > div.fv-container > table > tbody > tr > td > div > table:nth-child(1) > tbody > tr > td > div.snapshot-table-wrapper > table > tbody > tr:nth-child(10) > td:nth-child(6) > b').text(),
    erdate: $('body > div.content > div.ticker-wrapper.gradient-fade > div.fv-container > table > tbody > tr > td > div > table:nth-child(1) > tbody > tr > td > div.snapshot-table-wrapper > table > tbody > tr:nth-child(11) > td:nth-child(6) > b').text(),
  };
  return fa_num;
};
