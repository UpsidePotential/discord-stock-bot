import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { TickerTracker } from '../../services/tickerTracker';

const DeleteMessage = (message: Message, messageId: string): void => {
  message.channel.messages.fetch(messageId).then((value) => {
    value.delete().catch(() => {});
  }).catch(() => {});
};

export const FuckCommand: ICommand = {
  name: 'Fuck',
  helpDescription: 'fuck',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === 'fuck'),
  command: async (message: Message) => {
    const lastMessage = TickerTracker.getCallerMessage(message.author.id);
    DeleteMessage(message, lastMessage);

    const imageMessage = TickerTracker.getImageMessage(message.author.id);
    DeleteMessage(message, imageMessage);

    return Promise.resolve();
  },
};

export const GapperCommand: ICommand = {
  name: 'Gappers',
  helpDescription: 'Gappers',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!gappers'),
  command: async (message: Message) => {
    await message.reply("🤜🔴🤛")  
    return Promise.resolve();
  },
};

export const ManateeCommand: ICommand = {
  name: 'Manatee',
  helpDescription: 'Manatee',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!manatee'),
  command: async (message: Message) => {
    let i_rand =  Math.floor(Math.random() * 100); 
	let quant = Math.floor(Math.random() * 10);
	let cost = Math.floor(Math.random() * (18000 - 15000) + 15000);
    if (i_rand < 6) {
		await message.reply("**MODS**, probably Manatee")
	} else if (i_rand >= 6 && i_rand < 12) {
		await message.reply("According to my logs, Manatee is the most persecuted poster on this Discord.")
	} else if (i_rand >= 12 && i_rand < 18) {
	    await message.reply("__***BANATEE***__")
	} else if (i_rand >= 18 && i_rand < 24) {
	    await message.reply("Manatee's currently long "+quant.toString()+" NQ contracts from "+cost.toString())
	} else if (i_rand >= 24 && i_rand < 30) {
	    await message.reply("Manatee's currently short "+quant.toString()+" NQ contracts from "+cost.toString())
    } else if (i_rand >= 30 && i_rand < 65) {
	    await message.reply("$spy")
	} else {
	    await message.reply("$qqq")
	}
    return Promise.resolve();
  },
};
