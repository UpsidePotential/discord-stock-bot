import { Message } from 'discord.js';
import got from 'got';

import { ICommand } from '../../icommand';
import { extractFromOptions } from '../../common';
import { TickerTracker } from '../../services/tickerTracker';

export const CryptoCommand: ICommand = {
  name: 'Crypto',
  helpDescription: '$.{XXX} example $.btc will draw a BTC chart',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('$.'),
  command: async (message: Message) => {
    const ticker = message.content.toLowerCase().split(' ')[0].substring(2);
    const rawOptions = message.content.toLowerCase().split(ticker)[1].substring(1).split(' ');
    const options = [];
    for (let i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
    TickerTracker.postTicker(ticker, message.author.id, 'crypto');

    const timePeriod = extractFromOptions('time_period_forex', options);
    const file = await got(`https://elite.finviz.com/fx_image.ashx?${ticker}usd_${timePeriod}_l.png`);

    const sentMessage = await message.channel
      .send({
        files: [file.rawBody],
      });

    TickerTracker.lastTicker(message.author.id, message.id, (sentMessage as Message).id);
    return Promise.resolve();
  },
};
