import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { getFinvizScreenWholeTable } from './finviz-screener';

const breakingOut = 'https://finviz.com/screener.ashx?v=141&f=fa_debteq_u1,fa_roe_o20,sh_avgvol_o100,ta_highlow50d_nh,ta_sma20_pa,ta_sma200_pa,ta_sma50_pa&ft=4&o=-perf1w';

export const ScreenerCommand: ICommand = {
  name: 'Screener',
  helpDescription: '!screener finviz url',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!screener'),
  command: async (message: Message) => {
    const url = message.content.replace('!screener', '').trim();
    const table = await getFinvizScreenWholeTable(url);
    const arrayLength = Math.min(table.length, 5);
    const fields = table.slice(0, arrayLength).map((value) => ({
      name: value['ticker'] || 'N/A',
      value: `Price: ${value['price'] || 'N/A'} \u200b \u200b \u200b \u200b \u200b \u200b Avg Volume: ${value['avgvolume'] || 'N/A'}`,
    }));

    message.channel.send({
      embeds: [{
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL(),
        },
        color: 3447003,
        title: 'Custom Screener',
        url,
        fields,
      },
      ],
    });
  },
};

export const BreakoutCommand: ICommand = {
  name: 'Breakout',
  helpDescription: '!breakout lists stocks breaking out',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!breakout'),
  command: async (message: Message) => {
    const table = await getFinvizScreenWholeTable(breakingOut);
    const arrayLength = Math.min(table.length, 5);
    const fields = table.slice(0, arrayLength).map((value) => ({
      name: value['ticker'] || 'N/A',
      value: `Price: ${value['price'] || 'N/A'} \u200b \u200b \u200b \u200b Avg Volume: ${value['avgvolume'] || 'N/A'} \u200b \u200b \u200b \u200b Perf Week: ${value['perfweek'] || 'N/A'}`,
    }));

    message.channel.send({
      embeds: [{
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL(),
        },
        color: 3447003,
        title: 'Stock Breakout',
        url: breakingOut,
        fields,
      },
      ],
    });

    return Promise.resolve();
  },
};

export const WinnersCommand: ICommand = {
  name: 'Winners',
  helpDescription: '!winners (all | mid | large) top winners of the day',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!winners'),
  command: async (message: Message) => {
    if (message.author.bot) return;
    const cap = message.content.split(' ')[1]
    let i_rand =  Math.floor(Math.random() * 100);
    if (i_rand < 90) {
        let url;
        if (cap == 'large') {
            url = 'https://finviz.com/screener.ashx?v=111&s=ta_topgainers&f=cap_large';
        } else if (cap == 'mid') {
            url = 'https://finviz.com/screener.ashx?v=111&s=ta_topgainers&f=cap_mid';
        } else {
            url = 'https://finviz.com/screener.ashx?v=110&s=ta_topgainers';
        }
        const table = await getFinvizScreenWholeTable(url);
        const arrayLength = Math.min(table.length, 10);
        const fields = table.slice(0, arrayLength).map((value) => ({
          name: value['ticker'] || 'N/A',
          value: `Price: ${value['price'] || 'N/A'} \u200b \u200b \u200b \u200b Change: ${value['change'] || 'N/A'}`,
        }));

        message.channel.send({
          embeds: [{
            author: {
              name: message.client.user.username,
              icon_url: message.client.user.displayAvatarURL(),
            },
            color: 3447003,
            title: 'Winners \n Use !winners (all | mid | large) to filter by market cap',
            url,
            fields,
          },
          ],
        });
    } else {
      const emojis = [
        '<:sam:940321701160448130>',
        '<:laser:989233498101538816>',
        '<:yellen:1290754652731736136>',
      ];
      await message.reply(emojis[Math.floor(Math.random() * emojis.length)])
    }
  },
};

export const LosersCommand: ICommand = {
  name: 'Losers',
  helpDescription: '!losers (all | mid | large) top Losers of the day',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!losers'),
  command: async (message: Message) => {
    if (message.author.bot) return;
    const cap = message.content.split(' ')[1]
    let i_rand =  Math.floor(Math.random() * 100);
    if (i_rand < 90) {
        let url;
        if (cap == 'large') {
            url = 'https://finviz.com/screener.ashx?v=111&s=ta_toplosers&f=cap_largeover';
        } else if (cap == 'mid') {
            url = 'https://finviz.com/screener.ashx?v=111&s=ta_toplosers&f=cap_midover';
        } else {
            url = 'https://finviz.com/screener.ashx?v=110&s=ta_toplosers';
        }

        const table = await getFinvizScreenWholeTable(url);
        const arrayLength = Math.min(table.length, 10);
        const fields = table.slice(0, arrayLength).map((value) => ({
          name: value['ticker'] || 'N/A',
          value: `Price: ${value['price'] || 'N/A'} \u200b \u200b \u200b \u200b Change: ${value['change'] || 'N/A'}`,
        }));

        message.channel.send({
          embeds: [{
            author: {
              name: message.client.user.username,
              icon_url: message.client.user.displayAvatarURL(),
            },
            color: 3447003,
            title: 'Losers \n Use !losers (all | mid | large) to filter by market cap',
            url,
            fields,
          },
          ],
        });
    } else {
      const emojis = [
        '<:josh:1000540529295106111>',
        '<:manatee:1247321787801407538>',
        '<:sep:996587165909782538>',
        //'<:hurf:1014659739969400873>',
        '<:zeph:1365101988295082004>',
      ];
      await message.reply(emojis[Math.floor(Math.random() * emojis.length)])
    }
  },
};
