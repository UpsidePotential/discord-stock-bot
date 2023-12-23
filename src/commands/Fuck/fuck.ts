import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { TickerTracker } from '../../services/tickerTracker';
import { getFinvizScreenWholeTable } from '../Screener/finviz-screener';
import { beginMatrix } from './hurfbot';

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
    if (i_rand < 20) {
		await message.reply({ files : ["./src/commands/Fuck/images/Manatee1.png"] })
	} else if (i_rand >= 20 && i_rand < 40) {
		await message.reply("According to my logs, Manatee is the most persecuted poster on this Discord.")
	} else if (i_rand >= 40 && i_rand < 60) {
	    await message.reply("__***BANATEE***__")
	} else if (i_rand >= 60 && i_rand < 80) {
	    await message.reply({ files : ["./src/commands/Fuck/images/Manatee2.jpg"] })
    } else if (i_rand >= 80 && i_rand < 90) {
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
    if (i_rand < 40) {
		await message.reply({ files : ["./src/commands/Fuck/images/pastra1.jpg"] })
	} else if (i_rand >= 40 && i_rand < 52) {
		await message.reply("Excuse me Goons, do you have a moment to talk about our lord and savior Short Vol?")
	} else if (i_rand >= 52 && i_rand < 64) {
		await message.reply({ files : ["./src/commands/Fuck/images/vibe.gif"] })
	} else if (i_rand >= 64 && i_rand < 76) {
		await message.reply({ files : ["./src/commands/Fuck/images/pastra2.gif"] })
	} else if (i_rand >= 76 && i_rand < 88) {
		await message.reply({ files : ["./src/commands/Fuck/images/pastra3.gif"] })
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
    if (i_rand < 15) {
		await message.reply({ files : ["./src/commands/Fuck/images/Sep5.jpg"] })
	} else if (i_rand >= 15 && i_rand < 30) {
		await message.reply({ files : ["./src/commands/Fuck/images/Sepist3.png"] })
	} else if (i_rand >= 30 && i_rand < 45) {
		await message.reply({ files : ["./src/commands/Fuck/images/Sep2.png"] })
	} else if (i_rand >= 45 && i_rand < 60) {
		await message.reply('https://www.ziprecruiter.com/jobs-search?search=babysitter&location=Long+Island%2C+NY')
	} else if (i_rand >= 60 && i_rand < 75) {
		const fs = require('fs')
		const fileContent = fs.readFileSync('./src/commands/Fuck/images/Sepist.txt', 'utf-8');
		const lines = fileContent.split('\n');
		const line = lines[Math.floor(Math.random() * lines.length)]
		await message.reply(line)
	} else if (i_rand >= 75 && i_rand < 90) {
		await message.reply("$/bz d")
	} else {
	    await message.reply("I'm a humble landlord, carrying the weight,\n\Juggling repairs and an ever-growing slate.\n\
Society will never understand my plight,\n\In this landlord life, it's a constant fight.\n\n\Repainting walls and rented halls,\n\
Witness to tenants' rise and falls.\n\Leaving garbage with maggots in their wake,\n\A landlord's dilemma, decisions to make.\n\n\
Every late-night call, every rent dispute,\n\A puzzle to solve, a neverending pursuit\n\Of keeping the peace in this rented space,\n\
Being a landlord, it's no easy embrace.\n\n\So here's to the landlords, modern day knights!\n\Facing the challenges with all their might!\n\
A thankless job, their stories untold,\n\Providing valuable services, while constantly trolled.")
	}
    return Promise.resolve();
  },
};

export const PixaalCommand: ICommand = {
  name: 'Pixaal',
  helpDescription: 'Pixaal',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!pixaal'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 15) {
		await message.reply({ files : ["./src/commands/Fuck/images/Pix1.png"] })
	} else if (i_rand >= 15 && i_rand < 30) {
		await message.reply({ files : ["./src/commands/Fuck/images/pix2.png"] })
	} else if (i_rand >= 30 && i_rand < 45) {
		await message.reply({ files : ["./src/commands/Fuck/images/Pix3.png"] })
	} else if (i_rand >= 45 && i_rand < 60) {
		await message.reply({ files : ["./src/commands/Fuck/images/Pix4.png"] })
	} else if (i_rand >= 60 && i_rand < 75) {
		await message.reply({ files : ["./src/commands/Fuck/images/pastra2.gif"] })
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
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase().startsWith("new highs")),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 20) {
		await message.reply({ files : ["./src/commands/Fuck/images/newHighs.jpg"] })
	} else if (i_rand >= 20 && i_rand < 40) {
		await message.reply({ files : ["./src/commands/Fuck/images/newHighs2.gif"] })
	} else if (i_rand >= 40 && i_rand < 60) {
		await message.reply({ files : ["./src/commands/Fuck/images/newHighs3.gif"] })
	} else if (i_rand >= 60 && i_rand < 80) {
		await message.reply({ files : ["./src/commands/Fuck/images/newHighs4.gif"] })
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
	} else if (i_rand >= 20 && i_rand < 40) {
		await message.reply({ files : ["./src/commands/Fuck/images/newLows2.gif"] })
	} else if (i_rand >= 40 && i_rand < 60) {
		await message.reply({ files : ["./src/commands/Fuck/images/newLows3.gif"] })
	} else if (i_rand >= 60 && i_rand < 80) {
		await message.reply({ files : ["./src/commands/Fuck/images/newLows4.gif"] })
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
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!zeph'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 15) {
		await message.reply({ files : ["./src/commands/Fuck/images/Zeph1.png"] })
	} else if (i_rand >= 16 && i_rand < 30) {
		await message.reply({ files : ["./src/commands/Fuck/images/Zeph2.png"] })
	} else if (i_rand >= 30 && i_rand < 65) {
		const fs = require('fs')
		const fileContent = fs.readFileSync('./src/commands/Fuck/images/Cars.txt', 'utf-8');
		const lines = fileContent.split('\n');
		const line = lines[Math.floor(Math.random() * lines.length)]
		await message.reply(line)
	} else if (i_rand >= 65 && i_rand < 80) {
		await message.reply("$kold")
	} else if (i_rand >= 80 && i_rand < 90) {
		await message.reply("$sgov m")
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
    if (i_rand < 15) {
		await message.reply({ files : ["./src/commands/Fuck/images/ohio.gif"] })
	} else if (i_rand >= 15 && i_rand < 30) {
		const fs = require('fs')
		const fileContent = fs.readFileSync('./src/commands/Fuck/images/Bridges.txt', 'utf-8');
		const lines = fileContent.split('\n');
		const line = lines[Math.floor(Math.random() * lines.length)]
		await message.reply(line)
	} else if (i_rand >= 30 && i_rand < 45) {
		await message.reply("Just lmao that the market is pumping. Of course it is. Gotta love that rational and efficient market!")
	} else if (i_rand >= 45 && i_rand < 60) {
	    await message.reply("I see the current S&P 500 as a colossal suspension bridge pushed to its limits. \
The market resembles a structure with cables drawn tightly, mirroring an elevated price-to-earnings ratio. The \
economic landscape appears as turbulent winds, with inflation as the wind shear pushing the structure to its absolute limits. \
I believe investors should navigate cautiously. These turbulent times are going to stress the metaphorical bridge and those slight vibrations of \
uncertainty will most likely turn into a resonant vibration that will bring down the entire financial system. \ Consider a portfolio recalibration to ensure \
you can stay afloat in the ever-changing financial landscape.")
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
	} else if (i_rand >= 20 && i_rand < 35) {
		await message.reply({ files : ["./src/commands/Fuck/images/Josh2.png"] })
	} else if (i_rand >= 35 && i_rand < 50) {
		await message.reply({ files : ["./src/commands/Fuck/images/Josh.png"] })
	} else if (i_rand >= 50 && i_rand < 65) {
		await message.reply('https://www.youtube.com/watch?v=o3YadwGH0ZA')
	} else if (i_rand >= 65 && i_rand < 80) {
		await message.reply({ files : ["./src/commands/Fuck/images/Josh4.png"] })
	} else {
	    await message.reply("$tqqq d")
	}
    return Promise.resolve();
  },
};

export const ModsCommand: ICommand = {
  name: 'mods',
  helpDescription: 'mods',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase().startsWith('mods')),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 15) {
		await message.reply("PLEASE MODS! MODS!!!! PLEASE!!! Please help me!!! MODS!!! WHERE ARE YOU!?!?")
		await message.reply({ files : ["./src/commands/Fuck/images/mods.gif"] })
	} else if (i_rand >= 15 && i_rand < 30) {
		await message.reply({ files : ["./src/commands/Fuck/images/mods1.gif"] })
	} else if (i_rand >= 30 && i_rand < 45) {
		await message.reply({ files : ["./src/commands/Fuck/images/mods2.gif"] })
	}
	
    return Promise.resolve();
  },
};

export const HurfCommand: ICommand = {
  name: 'hurf',
  helpDescription: 'hurf',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!hurf'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 15) {
		await message.reply({ files : ["./src/commands/Fuck/images/hurf.png"] })
	} else if (i_rand >= 15 && i_rand < 20) {
		await message.reply({ files : ["./src/commands/Fuck/images/hurf1.png"]})
	} else if (i_rand >= 20 && i_rand < 25) {
		await message.reply({ files : ["./src/commands/Fuck/images/hurf2.png"]})
	} else if (i_rand >= 25 && i_rand < 30) {
		await message.reply({ files : ["./src/commands/Fuck/images/hurf3.png"]})
	} else if (i_rand >= 30 && i_rand < 35) {
		await message.reply({ files : ["./src/commands/Fuck/images/hurf4.png"]})
	} else if (i_rand >= 35 && i_rand < 40) {
		await message.reply({ files : ["./src/commands/Fuck/images/hurf5.png"]})
	} else {
	    function getRandomKey(matrix: Record<string, string[]>): string {
			const keys = Object.keys(matrix);
			return keys[Math.floor(Math.random() * 5)];
		}
		function getRandomWordFromArray(wordArray: string[] | undefined): string | undefined {
			if (!wordArray || wordArray.length === 0) {
				return undefined;
			}
			const randomIndex = Math.floor(Math.random() * wordArray.length);
			return wordArray[randomIndex];
		}
		function generateSentence(): string {
			let sentence = "";
			let currentKey: string | null = getRandomKey(beginMatrix);
            sentence += `${currentKey} `;
			while (currentKey) {
				const nextWord = getRandomWordFromArray(beginMatrix[currentKey]);
				if (nextWord) {
					sentence += `${nextWord} `;
					currentKey = nextWord;
				} else {
					currentKey = null;
				}
			}
			return sentence.trim();
		}
		const generatedSentence = generateSentence();
		await message.reply(generatedSentence)
	}
    return Promise.resolve();
  },
};

export const AdrenalCommand: ICommand = {
  name: 'Adrenal',
  helpDescription: 'Adrenal',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!adrenal'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 25) {
		await message.reply({ files : ["./src/commands/Fuck/images/Adrenal.jpg"] })
	} else if (i_rand >= 25 && i_rand < 50) {
		await message.reply({ files : ["./src/commands/Fuck/images/Adrenal1.png"] })
	} else if (i_rand >= 50 && i_rand < 75) {
		await message.reply({ files : ["./src/commands/Fuck/images/Adrenal2.png"] })
	} else {
		await message.reply({ files : ["./src/commands/Fuck/images/Adrenal3.png"] })
	}
    return Promise.resolve();
  },
};

export const WetGoodsCommand: ICommand = {
  name: 'WetGoods',
  helpDescription: 'WetGoods',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!wet_goods'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 75) {
		await message.reply("**Dry BADS**")
	} else {
		await message.reply("As one of two confirmed Latinos in chat, wet_goods is auto-goated.")
	}
    return Promise.resolve();
  },
};

export const TootersCommand: ICommand = {
  name: 'Tooters',
  helpDescription: 'Tooters',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!tooters'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 33) {
		await message.reply({ files : ["./src/commands/Fuck/images/WarTradesv2.gif"] })
	} else if (i_rand >= 33 && i_rand < 67) {
	    await message.reply({ files : ["./src/commands/Fuck/images/LisaTrades_V3.gif"] })
	} else {
		await message.reply({ files : ["./src/commands/Fuck/images/DontTrade_v5.gif"] })
	}
    return Promise.resolve();
  },
};

export const FlowinCommand: ICommand = {
  name: 'Flowin',
  helpDescription: 'Flowin',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!flowin'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 35) {
		await message.reply({ files : ["./src/commands/Fuck/images/Flowin_v2.gif"] })
	} else if (i_rand >= 35 && i_rand < 50 ) {
		await message.reply({ files : ["./src/commands/Fuck/images/Flowin.png"] })
	} else if (i_rand < 50 && i_rand < 75) {
		await message.reply({ files : ["./src/commands/Fuck/images/Flowin1.jpg"] })
	} else {
		await message.reply({ files : ["./src/commands/Fuck/images/Flowin2.png"] })
	}
    return Promise.resolve();
  },
};

export const DanglingCommand: ICommand = {
  name: 'Dangling',
  helpDescription: 'Dangling',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!dangling'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 25) {
		await message.reply({ files : ["./src/commands/Fuck/images/Dang1.png"] })
	} else if (i_rand >= 25 && i_rand < 65 ) {
		await message.reply({ files : ["./src/commands/Fuck/images/peeinpool.gif"] })
	} else if (i_rand < 65 && i_rand < 80) {
		await message.reply("$dkng d")
	} else {
		await message.reply("$penn d")
	}
    return Promise.resolve();
  },
};

export const NetbusCommand: ICommand = {
  name: 'Netbus',
  helpDescription: 'Netbus',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!netbus'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 30) {
		await message.reply("!rrg 1")
	} else if (i_rand >= 30 && i_rand < 60 ) {
		await message.reply("!rrg 2")
	} else if (i_rand < 60 && i_rand < 85) {
		await message.reply("!rrg 3")
	} else {
		await message.reply("\:regional_indicator_c: \:regional_indicator_u: \:regional_indicator_m:")
	}
    return Promise.resolve();
  },
};

export const ToalyCommand: ICommand = {
  name: 'Toaly',
  helpDescription: 'Toaly',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!toaly'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
	let quant = Math.floor(Math.random() * 10);
	let cost = Math.floor(Math.random() * 1000);
    if (i_rand < 15) {
		await message.reply("\:cry:")
		await message.reply("Please hit the buy button. Toaly needs this to pump or else they're going to be RUINED.")
	} else if (i_rand >= 15 && i_rand < 30 ) {
		await message.reply({ files : ["./src/commands/Fuck/images/Toaly1.png"] })
	} else if (i_rand < 30 && i_rand < 45) {
		await message.reply({ files : ["./src/commands/Fuck/images/Toaly2.png"] })
	} else if (i_rand < 45 && i_rand < 60) {
		await message.reply("Toaly has entered "+quant.toString()+" trades in the last 5 minutes.")
	} else if (i_rand < 45 && i_rand < 60) {
		await message.reply("Yes, Toaly is still long. Please check back later.")
	} else if (i_rand < 60 && i_rand < 75) {
		await message.reply("Yes, Toaly is still short, but not as short as Hurf.")
	} else {
		await message.reply("Toaly's been ruined "+cost.toString()+" times in the past 30 days. \:cry:")
	}
    return Promise.resolve();
  },
};

export const PotyCommand: ICommand = {
  name: 'Poty',
  helpDescription: 'Poty',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!poty'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 5) {
		await message.reply("Poster of the year");
	} else if (i_rand < 10) {
		await message.reply("Poty of the year");
	} else if (i_rand < 15) {
		await message.reply("Positivity of the year");
	} else if (i_rand < 20) {
		await message.reply("Protocol of the year");
	} else if (i_rand < 25) {
		await message.reply("Panic at the Disco of the year");
	} else if (i_rand < 30) {
		await message.reply("Paladin of the year");
	} else if (i_rand < 35) {
		await message.reply("Party of the year");
	} else if (i_rand < 40) {
		await message.reply("Platitude of the year");
	} else if (i_rand < 45) {
		await message.reply("Pistachio of the year");
	} else if (i_rand < 50) {
		await message.reply("Pan-European of the year");
	} else if (i_rand < 55) {
		await message.reply("Purple Rain of the year");
	} else if (i_rand < 60) {
		await message.reply("Player of the year");
	} else if (i_rand < 65) {
		await message.reply("Polka dancer of the year");
	} else if (i_rand < 70) {
		await message.reply("Profit/Earnings ratio of the year");
	} else if (i_rand < 75) {
		await message.reply("Psyduck of the year");
	} else if (i_rand < 80) {
		await message.reply("Precipitation of the year");
	} else if (i_rand < 85) {
		await message.reply("Poetry of the year");
	} else if (i_rand < 90) {
		await message.reply("Pyrocumulonimbus storm of the year");
	} else {
		await message.reply("Phriend of the year");
	}
    return Promise.resolve();
  },
};

export const PotyPassive: ICommand = {
  name: 'PotyPassive',
  helpDescription: 'PotyPassive',
  showInHelp: false,
  trigger: (msg: Message) => (/\bpoty\b/i.test(msg.content)),
  command: async (message: Message) => {
    const emotes = ['💯','🤜','🔴','🤛','😄','🍎','🍊','🍇','👍','👎','💪','🌱','📣','👏','👊','💭',
'✔','❌','♥','♦','♣','♠','✈'];
	await message.react(emotes[Math.floor(Math.random() * emotes.length)])
	await message.react(emotes[Math.floor(Math.random() * emotes.length)])
	await message.react(emotes[Math.floor(Math.random() * emotes.length)])
	
    return Promise.resolve();
  },
};

export const FreelanceCommand: ICommand = {
  name: 'Freelance',
  helpDescription: 'Freelance',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!freelance'),
  command: async (message: Message) => {
	const fs = require('fs')
	const fileContent = fs.readFileSync('./src/commands/Fuck/images/Horses.txt', 'utf-8');
	const lines = fileContent.split('\n');
	const line = lines[Math.floor(Math.random() * lines.length)]
	await message.reply(line)
    return Promise.resolve();
  },
};

export const HitManCommand: ICommand = {
  name: 'Hitman',
  helpDescription: 'Hitman',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!hit_man'),
  command: async (message: Message) => {
	const fs = require('fs')
	const fileContent = fs.readFileSync('./src/commands/Fuck/images/Lawns.txt', 'utf-8');
	const lines = fileContent.split('\n');
	const line = lines[Math.floor(Math.random() * lines.length)]
	await message.reply(line)
    return Promise.resolve();
  },
};

export const AbeCommand: ICommand = {
  name: 'Abe',
  helpDescription: 'Abe',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!abe'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 33) {
		await message.reply({ files : ["./src/commands/Fuck/images/Abe1.jpg"] })
	} else if (i_rand >= 33 && i_rand < 66 ) {
		await message.reply({ files : ["./src/commands/Fuck/images/Abe2.jpg"] })
	} else {
		await message.reply({ files : ["./src/commands/Fuck/images/Abe3.png"] })
	}
    return Promise.resolve();
  },
};