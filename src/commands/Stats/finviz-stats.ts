import got from 'got';
import * as cheerio from 'cheerio';

export interface stats_nyse {
  adv: string;
  dec: string;
  newlow: string;
  newhigh: string;
  abv50sma: string;
  bel50sma: string;
  abv200sma: string;
  bel200sma: string;
}

export const getStats = async (): Promise<stats_nyse> => {
  const result = await got('https://www.finviz.com');
  const $ = cheerio.load(result.body);

  const stats_nyse = {
    adv: $('#homepage > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(1) > div > div.market-stats_labels > div.market-stats_labels_left > p:nth-child(2)').text(),
    dec: $('#homepage > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(1) > div > div.market-stats_labels > div.market-stats_labels_right > p:nth-child(2)').text(),

    newhigh: $('#homepage > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(2) > div > div.market-stats_labels > div.market-stats_labels_left > p:nth-child(2)').text(),
    newlow: $('#homepage > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(2) > div > div.market-stats_labels > div.market-stats_labels_right > p:nth-child(2)').text(),

    abv50sma: $('#homepage > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(3) > div > div.market-stats_labels > div.market-stats_labels_left > p:nth-child(2)').text(),
    bel50sma: $('#homepage > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(3) > div > div.market-stats_labels > div.market-stats_labels_right > p:nth-child(2)').text(),
 
    abv200sma: $('#homepage > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(4) > div > div.market-stats_labels > div.market-stats_labels_left > p:nth-child(2)').text(),
    bel200sma: $('#homepage > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(4) > div > div.market-stats_labels > div.market-stats_labels_right > p:nth-child(2)').text(),
  };
  return stats_nyse;
};
