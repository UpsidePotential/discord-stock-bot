import { Message } from 'discord.js';

import { ICommand } from '../../icommand';
import { getSymbolInfo, getCompanyInfo, getCompanyNews } from './stockcharts-info';

export const InfoCommand: ICommand = {
  name: 'Info',
  helpDescription: '!info aapl',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!info'),
  command: async (message: Message) => {
    const ticker = message.content.replace('!info', '').trim();
    const info = await getSymbolInfo(ticker);
    const companyInfo = await getCompanyInfo(ticker);
    const companyNews = await getCompanyNews(ticker);

    message.channel.send({
      embeds: [{
        color: 3447003,
        title: ticker.toUpperCase(),
        fields: [
          { name: 'Price', value: info.close },
          { name: 'News', value: companyNews.slice(0, 10).join('\n') },
          { name: 'Summary', value: companyInfo.slice(0, 1024) },
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
