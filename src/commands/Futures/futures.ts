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
  },
};
