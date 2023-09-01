import { Message } from 'discord.js';
import got from 'got';

import { ICommand } from '../../icommand';
import { extractFromOptions } from '../../common';
import { drawMoon } from './moon';
import { TickerTracker } from '../../services/tickerTracker';

const tickerAlias = new Map([
  ['tim', 'aapl'],
  ['lisa', 'amd'],
  ['mouse', 'dis'],
  ['jeff', 'amzn'],
  ['nut', 'msft'],
]);

const goonTickers = ['ndra', 'aht'];

const getTicker = (name: string): string => {
  const normalizedName = name.toLowerCase();
  if (normalizedName === 'goon') {
    return goonTickers[Math.floor(Math.random() * goonTickers.length)];
  }

  const ticker = tickerAlias.get(normalizedName);
  if (ticker) {
    return ticker;
  }
  return name;
};

export const StocksCommand: ICommand = {
  name: 'Stocks',
  helpDescription: 'example $aapl draw aapl chart',
  showInHelp: true,
  trigger: (msg: Message) => {
    const regex = new RegExp(/^\$[a-zA-Z]+/);
    return regex.test(msg.content);
  },
  command: async (message: Message) => {
    let ticker = message.content.toLowerCase().split(' ')[0].substring(1);
    const rawOptions = message.content.toLowerCase().split(' ').slice(1);
	rawOptions.unshift(' ')
    const options = [];
    for (let i = 1; i < rawOptions.length; i++) options.push(rawOptions[i]);
    let timePeriod = extractFromOptions('time_period', options);
    const chartType = extractFromOptions('chart_type', options);
    const additionalIndicators = extractFromOptions('indicators', options);
    if (additionalIndicators.length !== 0) timePeriod = 'd';

    ticker = getTicker(ticker);

    const imgFile = `https://elite.finviz.com/chart.ashx?t=${
      ticker
    }&ty=${
      chartType
    }${timePeriod === 'd' ? `&ta=st_c,sch_200p${additionalIndicators}` : ''
    }&p=${
      timePeriod
    }&s=l`
        + `x=${Math.random()}.png`;

    TickerTracker.postTicker(ticker, message.author.id, 'stock');

    if (rawOptions.find((v) => v === 'moon')) {
      await drawMoon(imgFile, message);
    } else {
      const file = await got(imgFile);
      const sentMessage = await message.channel
        .send(
          {
            files: [file.rawBody],
          },
        );

      TickerTracker.lastTicker(message.author.id, message.id, (sentMessage as Message).id);
    }
  },
};

export const StockCharts: ICommand = {
  name: 'Stock Charts ',
  helpDescription: '!sc',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!sc'),
  command: async (message: Message) => {
    let ticker = message.content.toLowerCase().split(' ')[1];
    ticker = getTicker(ticker);

    TickerTracker.postTicker(ticker, message.author.id, 'stock');
    const image = await got(`https://stockcharts.com/c-sc/sc?s=${encodeURI(ticker)}&p=D&b=5&g=0&i=t7180212229c&r=1630253926270.png`);

    const sentMessage = await message.channel
      .send(
        {
          files: [
            image.rawBody,
          ],
        },
      );

    TickerTracker.lastTicker(message.author.id, message.id, (sentMessage as Message).id);
    return Promise.resolve();
  },
};
