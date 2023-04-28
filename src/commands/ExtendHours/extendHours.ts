import { Message } from 'discord.js';

import { ICommand } from '../../icommand';
import { getSymbolInfo } from './stockcharts-ext';

export const ExtendHoursCommand: ICommand = {
  name: 'ExtendHours',
  helpDescription: '!ext aapl',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!ext'),
  command: async (message: Message) => {
    const ticker = message.content.replace('!ext', '').trim();
    const price = await getSymbolInfo(ticker);
	//const extendedHoursClose = price.exhours.close;
	console.log(price.extendedHours)
    message.channel.send({
      embeds: [{
        color: 3447003,
        title: ticker.toUpperCase(),
		description: 'Extended hours prices (for when FinViz stops tracking it)',
        fields: [
          { name: 'Price', value: price.extendedHours.close.toString(), inline: true },
		  { name: '% Change', value: price.extendedHours.pctChg, inline: true },
		  { name: 'Time', value: price.extendedHours.time, inline: true },
        ],
      },
      ],
    }).catch((error) => {
		   // Error 50035 corresponds to empty field being sent to channel
		   if (error.code == 50035) {
			    message.channel.send("Someone finally got off their ass and put in an error catch.\n\
		      !info broke. Blank field returned. It'll get fixed soon.");
		   }
	  });
    return Promise.resolve();
  },
};
