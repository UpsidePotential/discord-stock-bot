import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { TickerTracker } from '../../services/tickerTracker';
import { getFinvizScreenWholeTable } from '../Screener/finviz-screener';

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
    if (i_rand < 10) {
		await message.reply("**MODS**, probably Manatee")
	} else if (i_rand >= 10 && i_rand < 20) {
		await message.reply("According to my logs, Manatee is the most persecuted poster on this Discord.")
	} else if (i_rand >= 20 && i_rand < 30) {
	    await message.reply("__***BANATEE***__")
	} else if (i_rand >= 30 && i_rand < 35) {
	    await message.reply("Manatee's currently long "+quant.toString()+" NQ contracts from "+cost.toString())
	} else if (i_rand >= 36 && i_rand < 40) {
	    await message.reply("Manatee's currently short "+quant.toString()+" NQ contracts from "+cost.toString())
    } else if (i_rand >= 40 && i_rand < 70) {
	    await message.reply("$spy")
	} else {
	    await message.reply("$qqq")
	}
    return Promise.resolve();
  },
};

export const PastramiCommand: ICommand = {
  name: 'Pastrami',
  helpDescription: 'Pastrami',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!pastrami'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 35) {
		await message.reply({ files : ["./src/commands/Fuck/images/pastra1.jpg"] })
	} else if (i_rand >= 36 && i_rand < 50) {
		await message.reply("Excuse me Goons, do you have a moment to talk about our lord and savior Short Vol?")
	} else if (i_rand >= 51 && i_rand < 75) {
		await message.reply({ files : ["./src/commands/Fuck/images/vibe.gif"] })
	} else {
	    await message.reply("$uvxy")
	}
    return Promise.resolve();
  },
};

export const SepistCommand: ICommand = {
  name: 'Sepist',
  helpDescription: 'Sepist',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!sepist'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 30) {
		await message.reply({ files : ["./src/commands/Fuck/images/Sep1.png"] })
	} else if (i_rand >= 31 && i_rand < 40) {
		await message.reply({ files : ["./src/commands/Fuck/images/Sep2.png"] })
	} else if (i_rand >= 41 && i_rand < 60) {
		await message.reply('https://www.ziprecruiter.com/jobs-search?search=babysitter&location=Long+Island%2C+NY')
	} else if (i_rand >= 61 && i_rand < 80) {
		await message.reply(':nerd~1:')
	} else {
	    await message.reply("$amzn d")
	}
    return Promise.resolve();
  },
};

export const PixxalCommand: ICommand = {
  name: 'Pixxal',
  helpDescription: 'Pixxal',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!pixxal'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 20) {
		await message.reply({ files : ["./src/commands/Fuck/images/Pix1.png"] })
	} else if (i_rand >= 21 && i_rand < 40) {
		await message.reply({ files : ["./src/commands/Fuck/images/Pix2.png"] })
	} else if (i_rand >= 41 && i_rand < 60) {
		await message.reply({ files : ["./src/commands/Fuck/images/Pix3.png"] })
	} else if (i_rand >= 61 && i_rand < 80) {
		await message.reply({ files : ["./src/commands/Fuck/images/Pix4.png"] })
	} else {
	    await message.reply("$gdx d")
	}
    return Promise.resolve();
  },
};

export const NewHighCommand: ICommand = {
  name: 'newHigh',
  helpDescription: 'newHigh',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === "new highs"),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 50) {
		await message.reply({ files : ["./src/commands/Fuck/images/newHighs.jpg"] })
	}
    return Promise.resolve();
  },
};

export const NewLowCommand: ICommand = {
  name: 'newLow',
  helpDescription: 'newLow',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase().startsWith('new lows')),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 20) {
		await message.reply({ files : ["./src/commands/Fuck/images/newLows.png"] })
	} else if (i_rand >= 21 && i_rand < 40) {
		await message.reply({ files : ["./src/commands/Fuck/images/newLows2.gif"] })
	}
    return Promise.resolve();
  },
};

export const ShitlordCommand: ICommand = {
  name: 'Shitlord',
  helpDescription: 'Shitlord',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!shitlord'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 50) {
		await message.reply({ files : ["./src/commands/Fuck/images/shit1.png"] })
	} else {
	    await message.reply("$jepi")
	}
    return Promise.resolve();
  },
};

export const ZephCommand: ICommand = {
  name: 'Zeph',
  helpDescription: 'Zeph',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!zephyris'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 20) {
		await message.reply({ files : ["./src/commands/Fuck/images/Zeph1.png"] })
	} else if (i_rand >= 21 && i_rand < 40) {
		await message.reply({ files : ["./src/commands/Fuck/images/Zeph2.png"] })
	} else if (i_rand >= 41 && i_rand < 60) {
		const fs = require('fs')
		const fileContent = fs.readFileSync('./src/commands/Fuck/images/Cars.txt', 'utf-8');
		const lines = fileContent.split('\n');
		const line = lines[Math.floor(Math.random() * lines.length)]
		await message.reply(line)
	} else {
	    await message.reply("$svix d")
	}
    return Promise.resolve();
  },
};

export const MilkCommand: ICommand = {
  name: 'Milkman',
  helpDescription: 'Milkman',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!milk'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 20) {
		await message.reply({ files : ["./src/commands/Fuck/images/ohio.gif"] })
	} else if (i_rand >= 21 && i_rand < 60) {
		const fs = require('fs')
		const fileContent = fs.readFileSync('./src/commands/Fuck/images/Bridges.txt', 'utf-8');
		const lines = fileContent.split('\n');
		const line = lines[Math.floor(Math.random() * lines.length)]
		await message.reply(line)
	} else {
		let url = 'https://finviz.com/screener.ashx?v=110&s=ta_topgainers';
		const table = await getFinvizScreenWholeTable(url);
		const arrayLength = Math.min(table.length, 5);
		const fields = table.slice(0, arrayLength).map((value) => ({
			name: value.ticker,
			value: `Price: ${value.price} Change: ${value.change}`,
		}));
		await message.reply("$"+fields[Math.floor(Math.random() * arrayLength)-1].name)
	    await message.reply("did you listen???")
	}
    return Promise.resolve();
  },
};

export const JoshCommand: ICommand = {
  name: 'Josh',
  helpDescription: 'Josh',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!josh'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 20) {
		await message.reply("To take a photo while *subtly* including your shorts or pants in the frame, \
consider positioning the camera at a slight angle to capture both yourself and the lower half of your body.\n\
Use a timer or a remote shutter to allow yourself some distance from the camera, ensuring a natural and composed pose. \
Pay attention to the lighting to ***enhance*** the 'details' of your bulge.\n\
Experiment with different angles and poses to find the most flattering composition for your *outline*. \
Remember to maintain a confident and relaxed expression for a genuine and appealing photograph.")
	} else if (i_rand >= 21 && i_rand < 40) {
		await message.reply(':nerd~2:')
	} else if (i_rand >= 41 && i_rand < 60) {
		await message.reply('https://youtu.be/PrZd9Lvj-fY?t=5166')
	} else if (i_rand >= 61 && i_rand < 80) {
		await message.reply('https://www.youtube.com/watch?v=gksYSinu4kY')
	} else {
	    await message.reply("$tqqq d")
	}
    return Promise.resolve();
  },
};