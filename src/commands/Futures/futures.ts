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
]);

const getTicker = (name: string): string => {
  const normalizedName = name.toLowerCase();

  const ticker = tickerAlias.get(normalizedName);
  if (ticker) {
    return ticker;
  }
  return name;
};

export const updateText = (imgUrl: string, msg: Message): void => {
  const sharpStream = sharp({
    failOnError: false,
  });

  const promises = [];

  promises.push(
    sharpStream
      .clone()
      .composite([{ input: 'yup.png', gravity: 'northwest' }])
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
	try{
		let ticker = message.content.toLowerCase().split(' ')[0].substring(1);
		const ogTicker = ticker;
		const rawOptions = message.content.toLowerCase().split(ticker)[1].substring(1).split(' ');
		const options = [];
		for (let i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
		const timePeriod = extractFromOptions('time_period_futures', options);
		ticker = `@` + getTicker(ticker).slice(1);
		const file = `https://charts-node.finviz.com/chart.ashx?cs=l&t=${ticker}&tf=${timePeriod}&s=linear&ct=candle_stick&o[0][ot]=sma&o[0][op]=20&o[0][oc]=FF8F33C6&o[1][ot]=sma&o[1][op]=50&o[1][oc]=DCB3326D&o[2][ot]=sma&o[2][op]=200&o[2][oc]=DC32B363&o[3][ot]=patterns&o[3][op]=&o[3][oc]=000`
		//const file = `https://charts-node.finviz.com/chart.ashx?cs=m&t=@${ticker}&tf=${timePeriod}&s=linear&ct=candle_stick&f=1`+ `x=${Math.random()}.png`
		TickerTracker.postTicker(ticker, message.author.id, 'future');
		const image = await got(file);
		const sentMessage = await message.channel.send(
			{
			  files: [
				image.rawBody,
			  ],
			},
		  );
		TickerTracker.lastTicker(message.author.id, message.id, (sentMessage as Message).id);
		console.log("At least we are in here...")
		return Promise.resolve();
	} catch {
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
