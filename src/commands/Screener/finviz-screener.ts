import got from 'got';
import * as cheerio from 'cheerio';

interface FinVizTable {
    avgvolume: string;
    change: string;
    perfhalf: string;
    perfmonth: string;
    perfquart: string;
    perfweek: string;
    perfyear: string;
    perfytd: string;
    price: string;
    recom: string;
    relvolume: string;
    ticker: string;
    volatilitym: string;
    volatilityw: string;
    volume: string;
}

export const getFinvizScreenWholeTable = async (
  finvizScreenerUrl: string,
): Promise<FinVizTable[]> => {
  if (!finvizScreenerUrl.startsWith('https://finviz.com/screener.ashx?v=')) {
    throw Error('Screener must be a finviz screener. https://finviz.com/screener.ashx?v=');
  }
  const result = await got(finvizScreenerUrl);
  const $ = cheerio.load(result.body);
  const scrapedData: FinVizTable[] = [];
  const tableHeaders: string[] = ['No.','ticker','Company','Sector','Industry','Country','Market Cap','P/E','price','change','Volume'];
  $('#screener-table > td > table > tbody > tr > td > table > tbody > tr').each((index, element) => {
    /* if (index === 0) {
      const ths = $(element).find('td');
      $(ths).each((_i, tdElement) => {
        tableHeaders.push(
          $(tdElement)
            .text()
            .toLowerCase()
            .replace(/\s/g, ''),
        );
      });
      return true;
    } */

    const tds = $(element).find('td');
    const tableRow: any = {};
    $(tds).each((i, tdElement) => {
      tableRow[tableHeaders[i]] = $(tdElement).text();
    });
    scrapedData.push(tableRow);
    return true;
  });

  return scrapedData;
};
