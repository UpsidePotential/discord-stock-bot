import { Message } from 'discord.js';
import sharp from 'sharp';
import got from 'got';
import fs from 'fs';
import { ICommand } from '../../icommand';
import { extractFromOptions } from '../../common';
import { TickerTracker } from '../../services/tickerTracker';

const tickerAlias = new Map([
  ['/rusty', '/er2'],
  ['/rty', '/er2'],
  ['/cum', '/cl'],
  ['/bz', '/zm'],
  ['/jpy', '/6j'],
  ['/eur', '/6e'],
  ['/cad', '/6c'],
  ['/dxy', '/dx'],
  ['/usd', '/dx'],
]);

const getTicker = (name: string): string => {
  const normalizedName = name.toLowerCase();

  const ticker = tickerAlias.get(normalizedName);
  if (ticker) {
    return ticker;
  }
  return name;
};

export const updateText = (imgUrl: string, msg: Message, ogTicker: string): void => {
  const sharpStream = sharp({
    failOnError: false,
  });

  const promises = [];
  const newTitle = ogTicker === '/cum' ? 'yup.png' : 'ziti.png';

  promises.push(
    sharpStream
      .clone()
      .composite([{ input: newTitle, gravity: 'northwest' }])
      .toFile('temp.png'),
  );

  got.stream(imgUrl).pipe(sharpStream);

  Promise.all(promises)
    .then(() => {
      msg.channel
        .send(
          {
            files: ['temp.png'],
          },
        ).then(() => fs.unlinkSync('temp.png'));
    })
    .catch((err) => {
      console.error("Error processing files, let's clean it up", err);
      fs.unlinkSync('temp.png');
    });
};

export const FuturesCommand: ICommand = {
  name: 'Futures',
  helpDescription: '$/es will draw es chart',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('$/'),
  command: async (message: Message) => {
    let ticker = message.content.toLowerCase().split(' ')[0].substring(1)
	if (ticker != '/') {
		const ogTicker = ticker;
		const rawOptions = message.content.toLowerCase().split(ticker)[1].substring(1).split(' ');
		const options = [];
		for (let i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
		const timePeriod = extractFromOptions('time_period_futures', options);
		const indicators = extractFromOptions('indicators', options);
		ticker = `@` + getTicker(ticker).slice(1);
		const file = `https://charts-node.finviz.com/chart.ashx?cs=l&t=${ticker}&tf=${timePeriod}&s=linear&ct=candle_stick&${indicators}`

        if (ogTicker === '/cum') {
            return updateText(file, message, ogTicker);
        }
        if (ogTicker === '/bz') {
            return updateText(file, message, ogTicker);
        }
        const image = await got(file);
		const sentMessage = await message.channel.send(
			{
			  files: [
				image.rawBody,
			  ],
			},
		  );
		return Promise.resolve();
	} else {
		let ticker = message.content.toLowerCase().split(' ')[0].substring(2);
		const ogTicker = ticker;
		let timePeriod = '5'
		const rawOptions = message.content.toLowerCase().split(ticker)[1].substring(1).split(' ');
		if (rawOptions[0] != "")
		{
			timePeriod = rawOptions[0]
		}
		const image = await got(`${process.env.MARKET_DASHBOARD_URI}/futureschart/${ticker}/${timePeriod}`);
		const fSize = Buffer.byteLength(image.body);
		  console.log(fSize)
		  if (fSize > 12000) {
			const sentMessage = await message.channel
			  .send(
			  {
				files: [
				  image.rawBody,
				],
			  },
			);
		  } else {
			const fs = require('fs')
			const fileContent = fs.readFileSync('./src/commands/Stocks/invalidMsg.txt', 'utf-8');
			const lines = fileContent.split('\n');
			const line = lines[Math.floor(Math.random() * lines.length)]
			await message.reply(line)
		  }
		return Promise.resolve();
	}
  },
};
