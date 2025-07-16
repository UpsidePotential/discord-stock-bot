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

const goonTickers = ['ndra', 'aht', 'airs', 'intc'];
const brkbTickers = ['brkb', 'brk.b', 'brk/b', 'brk\b', 'brk_b']
const dxyTickers = ['.dx', '.dxy', '.usd', '/usd', '/dxy', 'dxy']
const stopTickers = ['intc']

const getTicker = (name: string): string => {
  const normalizedName = name.toLowerCase();
  if (normalizedName === 'goon') {
    return goonTickers[Math.floor(Math.random() * goonTickers.length)];
  }
  if (brkbTickers.includes(normalizedName)) {
    return 'brk-b'
  }
  if (dxyTickers.includes(normalizedName)) {
    return '@dx'
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
    const allowedChannelIds = ['725372823429972048', '773959920138584094'];
    //if (allowedChannelIds.includes(message.channel.id)) {
    if (true) {
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
        let i_rand =  Math.floor(Math.random() * 100);
        
        if (stopTickers.includes(ticker) && i_rand < 10) {
            await message.reply({ files : ["./src/commands/Fuck/images/stop.gif"] })
            return Promise.resolve();
        }
        if (ticker === 'cum') {
            let images = [
            "./src/commands/Fuck/images/cum1.png",
            "./src/commands/Fuck/images/cum2.png",
            "./src/commands/Fuck/images/cum3.png",
            "./src/commands/Fuck/images/cum4.png",
            ];
            await message.channel.send({ files : [images[Math.floor(Math.random() * images.length)]] });
            return Promise.resolve();
        }
        if (ticker === 'fuck') {
            let images = [
            "./src/commands/Fuck/images/fuck1.jpg",
            "./src/commands/Fuck/images/fuck2.jpg",
            "./src/commands/Fuck/images/fuck3.jpg",
            "./src/commands/Fuck/images/fuck4.jpg",
            ];
            await message.channel.send({ files : [images[Math.floor(Math.random() * images.length)]] });
            return Promise.resolve();
        }
        if (ticker === 'shit') {
            let images = [
            "./src/commands/Fuck/images/shit1.jpg",
            "./src/commands/Fuck/images/shit2.jpg",
            ];
            await message.channel.send({ files : [images[Math.floor(Math.random() * images.length)]] });
            return Promise.resolve();
        }
        if (ticker === 'piss') {
            let images = [
            "./src/commands/Fuck/images/piss1.jpg",
            "./src/commands/Fuck/images/piss2.jpg",
            ];
            await message.channel.send({ files : [images[Math.floor(Math.random() * images.length)]] });
            return Promise.resolve();
        }
        if (ticker === 'pope') {
            await message.channel.send({ files : ["./src/commands/Fuck/images/hurfPope.png"] });
            return Promise.resolve();
        }
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
    } else {
      await message.reply('No' + message.author.toString())
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