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
  ['felon', 'djt'],
  ['nazi', 'tsla']
]);

const goonTickers = ['ndra', 'aht'];
const brkbTickers = ['brkb', 'brk.b', 'brk/b', 'brk\b', 'brk_b']

const getTicker = (name: string): string => {
  const normalizedName = name.toLowerCase();
  if (normalizedName === 'goon') {
    return goonTickers[Math.floor(Math.random() * goonTickers.length)];
  }
  if (brkbTickers.includes(normalizedName)) {
    return 'brk-b'
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
    const indicators = extractFromOptions('indicators', options);
    //if (indicators.length !== 0) timePeriod = 'd';

    ticker = getTicker(ticker);

    const imgFile = `https://charts-node.finviz.com/chart.ashx?cs=l&t=${
      ticker
    }&ct=${
      chartType
    }&tf=${
      timePeriod
    }${
      indicators
    }&s=linear`;
    TickerTracker.postTicker(ticker, message.author.id, 'stock');

    if (rawOptions.find((v) => v === 'moon')) {
      await drawMoon(imgFile, message);
    } else {
      const file = await got(imgFile);
	    const fSize = Buffer.byteLength(file.body);
	    if (fSize > 12000 && ticker.length < 6) {
	      const sentMessage = await message.channel.send(
			  {
				  files: [file.rawBody],
			  },
			);
		  TickerTracker.lastTicker(message.author.id, message.id, (sentMessage as Message).id);
		  } else {
		    const fs = require('fs')
		    const fileContent = fs.readFileSync('./src/commands/Stocks/invalidMsg.txt', 'utf-8');
		    const lines = fileContent.split('\n');
		    const line = lines[Math.floor(Math.random() * lines.length)]
		    await message.reply(line)
		  }
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
	const fSize = Buffer.byteLength(image.body);
	if (fSize > 12000) {
      const sentMessage = await message.channel
        .send(
          {
            files: [
              image.rawBody,
            ],
          },
        );
		TickerTracker.lastTicker(message.author.id, message.id, (sentMessage as Message).id);
    } else {
	  const fs = require('fs')
	  const fileContent = fs.readFileSync('./src/commands/Stocks/invalidMsg.txt', 'utf-8');
	  const lines = fileContent.split('\n');
	  const line = lines[Math.floor(Math.random() * lines.length)]
	  await message.reply(line)
	}
    
    return Promise.resolve();
  },
};

export const HeatMap: ICommand = {
  name: 'Heat Map ',
  helpDescription: '!hm',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!hm'),
  command: async (message: Message) => {
    const image = await got(`https://github.com/Poppingfresh/CoT_Repo/blob/main/Figs/hm.png?raw=true`);
    await message.channel.send({files: [image.rawBody]});
  },
};