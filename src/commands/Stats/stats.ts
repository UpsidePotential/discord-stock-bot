import { Message } from 'discord.js';

import { ICommand } from '../../icommand';
import { getStats } from './finviz-stats';

export const StatsCommand: ICommand = {
  name: 'Stats',
  helpDescription: '!stats (Gets NYSE stock statistics from FinViz)',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!stats'),
  command: async (message: Message) => {
    const stats = await getStats();
    message.channel.send({
      embeds: [{
        color: 3447003,
        title: 'NYSE Stock Statistics from FinViz',
		description: 'Number (and %) of NYSE stocks that are:',
        fields: [
          { name: 'Advancing', value: stats.adv, inline:true },
          { name: 'Declining', value: stats.dec.split(' ')[1].concat(" ", stats.dec.split(' ')[0]), inline:true },
          { name: 'Making new all time highs:', value: stats.newhigh.split(' ')[1].replace("(", '').replace(")",''), inline:false },
		  { name: 'Making new all time lows:', value: stats.newlow.split(' ')[0].replace("(", '').replace(")",''), inline:true },
		  { name: 'Above 50-day SMA:', value: stats.abv50sma, inline: false},
		  { name: 'Below 50-day SMA:', value: stats.bel50sma.split(' ')[1].concat(" ", stats.bel50sma.split(' ')[0]), inline:true },
		  { name: 'Above 200-day SMA:', value: stats.abv200sma, inline:false },
		  { name: 'Below 200-day SMA:', value: stats.bel200sma.split(' ')[1].concat(" ", stats.bel200sma.split(' ')[0]), inline:true },
        ],
      },
      ],
    }).catch((error) => {
		   // Error 50035 corresponds to empty field being sent to channel
		   if (error.code == 50035) {
			    message.channel.send("My statistics algo shows that you are broke. Time to leave the Discord.");
		   }
	  });
    return Promise.resolve();
  },
};
