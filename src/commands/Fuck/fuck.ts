import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { TickerTracker } from '../../services/tickerTracker';
import { getFinvizScreenWholeTable } from '../Screener/finviz-screener';
import { beginMatrix } from './hurfbot';

const ManateeCases = [-1, -1, -1, -1, -1];
const SepCases = [-1, -1, -1, -1, -1, -1];
const ZephCases = [-1, -1, -1, -1, -1, -1];
const DangCases = [-1, -1, -1, -1];
const MilkCases = [-1, -1, -1];
const JoshCases = [-1, -1, -1];
const TootCases = [-1, -1];
const RootCases = [-1, -1, -1, -1];

function weightedRandomCase(probabilities: number[]): number {
  const totalWeight = probabilities.reduce((total, weight) => total + weight, 0);
  let random = Math.floor(Math.random() * totalWeight);
  for (let i = 0; i < probabilities.length; i++) {
    if (random < probabilities[i]) {
      return i;
    }
    random -= probabilities[i];
  }
  return probabilities.length - 1;
}

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
    const probabilities = [20, 20, 20, 20, 10, 10];
    let newCase;
    do {
      newCase = weightedRandomCase(probabilities);
    } while (ManateeCases.includes(newCase));
	ManateeCases.shift();
	ManateeCases.push(newCase);
	
    switch (newCase) {
		case 0:
			await message.reply({ files : ["./src/commands/Fuck/images/Manatee1.png"] });
			break;
		case 1:
			await message.reply("According to my logs, Manatee is the most persecuted poster on this Discord.");
			break;
		case 2:
			await message.reply("__***BANATEE***__");
			break;
		case 3:
			await message.reply("**~MODS~!!!**... Manatee probably");
			break;
		case 4:
			await message.reply("$spy");
			break;
		default:
			await message.reply("$qqq")
			break;
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
	const probabilities = [15, 10, 10, 10, 25, 20, 10];
    let newCase;
    do {
      newCase = weightedRandomCase(probabilities);
    } while (SepCases.includes(newCase));
	SepCases.shift();
	SepCases.push(newCase);
    
	switch (newCase) {
		case 0:
			await message.reply({ files : ["./src/commands/Fuck/images/Sep5.jpg"] });
			break;
		case 1:
			await message.reply("$/bz d");
			await message.reply({ files : ["./src/commands/Fuck/images/ziti.gif"] });
			break;
		case 2:
			await message.reply({ files : ["./src/commands/Fuck/images/Sep1.png"] });
			break;
		case 3:
			await message.reply({ files : ["./src/commands/Fuck/images/Sep2.png"] });
			break;
		case 4:
			const fs = require('fs')
			const fileContent = fs.readFileSync('./src/commands/Fuck/images/Sepist.txt', 'utf-8');
			const lines = fileContent.split('\n');
			const line = lines[Math.floor(Math.random() * lines.length)]
			await message.reply(line)
			break;
		case 5:
			await message.reply("Upon my window, there it boldly stood,\n\
A wasp's nest, brimming with a buzzing might,\n\
A threat to peaceful days in neighborhood,\n\
It challenged me, demanding a brutal fight.\n\
\n\n\
With courage strong, I planned my bold attack,\n\
Prepared with poison spray of shoddy make,\n\
At day's last light, after the skies turned black,\n\
I faced the swarm, for my family's safety's sake.\n\
\n\n\
But in my rush, a fact I overlooked,\n\
The difference 'tween wasp and bee unclear.\n\
My fervor might have harmed a bee mistook,\n\
Disturbing nature's balance, oh so dear.");
			break;
		default:
			await message.reply("https://www.udio.com/songs/wYFqDEQV49vDpMPxR2KdLH");
			break;
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
	const probabilities = [20, 20, 20, 10, 10, 10, 10];
    let newCase;
    do {
      newCase = weightedRandomCase(probabilities);
    } while (ZephCases.includes(newCase));
	ZephCases.shift();
	ZephCases.push(newCase);
	
    switch (newCase) {
		case 0:
			await message.reply({ files : ["./src/commands/Fuck/images/Zeph1.jpg"] })
			break;
		case 1:
			await message.reply({ files : ["./src/commands/Fuck/images/Zeph2.png"] })
			break;
		case 2:
			const fs = require('fs')
			const fileContent = fs.readFileSync('./src/commands/Fuck/images/Cars.txt', 'utf-8');
			const lines = fileContent.split('\n');
			const line = lines[Math.floor(Math.random() * lines.length)]
			await message.reply(line)
			break;
		case 3:
			await message.reply({ files : ["./src/commands/Fuck/images/Zeph3.jpg"] })
			break;
		case 4:
			await message.reply({ files : ["./src/commands/Fuck/images/ZephJedi.png"] })
			break;
		case 5:
			await message.reply("$sgov m")
			break;
		default:
			await message.reply({ files : ["./src/commands/Fuck/images/ZephJedi2.png"] })
			break;
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
	const probabilities = [10, 10, 5, 25, 25, 25];
    let newCase;
    do {
      newCase = weightedRandomCase(probabilities);
    } while (MilkCases.includes(newCase));
	MilkCases.shift();
	MilkCases.push(newCase);
	
     switch (newCase) {
		case 0:
			await message.reply({ files : ["./src/commands/Fuck/images/ohio.gif"] })
			break;
		case 1:
			const fs = require('fs')
			const fileContent = fs.readFileSync('./src/commands/Fuck/images/Bridges.txt', 'utf-8');
			const lines = fileContent.split('\n');
			const line = lines[Math.floor(Math.random() * lines.length)]
			await message.reply(line)
			break;
		case 2:
			const time_now = new Date();
			var hours = time_now.getHours() % 12 || 12;
			const chours = hours.toString().padStart(2,'0');
			const cminutes = time_now.getMinutes().toString().padStart(2,'0');
			const rand_mins = Math.floor(Math.random() * 45);
			const new_time = new Date(time_now.getTime() + rand_mins *60000);
			var hours = new_time.getHours() % 12 || 12;
			const nhours = hours.toString().padStart(2,'0');
			const nminutes = new_time.getMinutes().toString().padStart(2,'0');
			const subCase = Math.floor(Math.random() * 5)
			switch (subCase) {
				case 0:
					await message.reply("Just lmao that the market is pumping. Of course it is. Gotta love that rational and efficient market!")
					break;
				case 1:
					await message.reply("Short at "+nhours+":"+nminutes+" looking good. But I'm not going to take it")
					break;
				case 2:
					await message.reply("Long at "+chours+":"+cminutes+". Easiest trade ever, not sure why I don't do it every day.")
					break;
				case 3:
					await message.reply("Terrible long at "+nhours+":"+nminutes+" setup. It'll probably still pump. Stupid market.")
					break;
				case 4:
					await message.reply("Short at "+chours+":"+cminutes+" STAYS WINNING. Like and subscribe you dummies.")
					break;
				default:
					await message.reply("Damn it was a short at "+chours+":"+cminutes+" day just to make me look like a fool")
					break;
					}
			break;
		case 3:
			const fs1 = require('fs')
			const fileContent1 = fs1.readFileSync('./src/commands/Fuck/images/Engineer.txt', 'utf-8');
			const lines1 = fileContent1.split('\n');
			const line1 = lines1[Math.floor(Math.random() * lines1.length)]
			await message.reply(line1)
			break;
		case 4:
			try{
				let url = 'https://finviz.com/screener.ashx?v=110&s=ta_topgainers';
				const table = await getFinvizScreenWholeTable(url);
				const arrayLength = Math.min(table.length, 5);
				const fields = table.slice(0, arrayLength).map((value) => ({
					name: value.ticker,
					value: `Price: ${value.price} Change: ${value.change}`,
				}));
				await message.reply("$"+fields[Math.floor(Math.random() * arrayLength)-1].name)
				await message.reply("did you listen???")
			} catch(err) {
				await message.reply("Just lmao that the market is pumping. Of course it is. Gotta love that rational and efficient market!")
			}
			break;
		default:
			try {
				let url_fa = 'https://finviz.com/screener.ashx?v=111&f=cap_largeover,exch_nyse,fa_fpe_high,fa_pe_high';
				const table1 = await getFinvizScreenWholeTable(url_fa);
				const arrayLength1 = Math.min(table1.length, 5);
				const fields1 = table1.slice(0, arrayLength1).map((value) => ({
					name: value.ticker,
					value: `Price: ${value.price} Change: ${value.change}`,
				}));
				await message.reply("!fa "+fields1[Math.floor(Math.random() * arrayLength1)-1].name)
				await message.reply("Now here's a stock with a sane P/E to invest in...")
				break;
			} catch(err) {
				await message.reply("Investing is like building a bridge. Your portfolio, much like a rickety suspension bridge, \
sways precariously with every market gust. Diversification? HAH! It's like using multiple weak support cables instead of a few \
strong ones - they'll all snap under enough pressure. Your high-risk investments are cheap materials that will crumble at any moment. \
The slow corrosion of inflation eats away at your returns like rust on steel beams. In the end, an unexpected economic earthquake will still bring the whole \
system crashing down. But hey, at least bridges are insured.")
			}
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
	const probabilities = [15, 10, 15, 25, 25, 10];
    let newCase;
    do {
      newCase = weightedRandomCase(probabilities);
    } while (JoshCases.includes(newCase));
	JoshCases.shift();
	JoshCases.push(newCase);
    
	switch (newCase) {
		case 0:
			await message.reply("To take a photo while *subtly* including your shorts or pants in the frame, \
consider positioning the camera at a slight angle to capture both yourself and the lower half of your body.\n\
Use a timer or a remote shutter to allow yourself some distance from the camera, ensuring a natural and composed pose. \
Pay attention to the lighting to ***enhance*** the 'details' of your bulge.\n\
Experiment with different angles and poses to find the most flattering composition for your *outline*. \
Remember to maintain a confident and relaxed expression for a genuine and appealing photograph.")
			break;
		case 1:
			await message.reply({ files : ["./src/commands/Fuck/images/Josh2.png"] })
			break;
		case 2:
			await message.reply({ files : ["./src/commands/Fuck/images/Josh.png"] })
			break;
		case 3:
			await message.reply({ files : ["./src/commands/Fuck/images/Josh4.jpg"] })
			break;
		case 4:
			await message.reply({ files : ["./src/commands/Fuck/images/Josh4.png"] })
			break;
		default:
			await message.reply({ files : ["./src/commands/Fuck/images/Josh4.jpg"] })
			break;
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
	if (message.author.id === '725363876270702672' || message.author.id === '137044883721420800') {
		let i_rand =  Math.floor(Math.random() * 100);
		if (i_rand < 75) {
			await message.reply({ files : ["./src/commands/Fuck/images/selfmods.jpg"] })
		}
		return Promise.resolve();
	} else {  
		let i_rand =  Math.floor(Math.random() * 100); 
		if (i_rand < 12) {
			await message.reply({ files : ["./src/commands/Fuck/images/mods.gif"] })
		} else if (i_rand >= 12 && i_rand < 24) {
			await message.reply({ files : ["./src/commands/Fuck/images/mods1.gif"] })
		} else if (i_rand >= 24 && i_rand < 36) {
			await message.reply({ files : ["./src/commands/Fuck/images/mods2.gif"] })
		} else if (i_rand >= 36 && i_rand < 48) {
			await message.reply({ files : ["./src/commands/Fuck/images/mods3.gif"] })
		} else if (i_rand >= 48 && i_rand < 60) {
			await message.reply("**Hahahahahahahaha How The Fuck Is Cyber Bullying Real Hahahaha Just Walk Away From The Screen Like Just Close Your Eyes Haha**")
		}
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
    if (i_rand < 10) {
		await message.reply({ files : ["./src/commands/Fuck/images/hurf.png"] })
	} else if (i_rand >= 10 && i_rand < 15) {
		await message.reply({ files : ["./src/commands/Fuck/images/hurf1.png"]})
	} else if (i_rand >= 15 && i_rand < 20) {
		await message.reply({ files : ["./src/commands/Fuck/images/hurf2.png"]})
	} else if (i_rand >= 20 && i_rand < 25) {
		await message.reply({ files : ["./src/commands/Fuck/images/hurf00.png"]})
	} else if (i_rand >= 25 && i_rand < 30) {
		await message.reply({ files : ["./src/commands/Fuck/images/hurf4.png"]})
	} else if (i_rand >= 30 && i_rand < 35) {
		await message.reply({ files : ["./src/commands/Fuck/images/hurf.mp4"]})
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
    if (i_rand < 12) {
		await message.reply({ files : ["./src/commands/Fuck/images/Adrenal.jpg"] })
	} else if (i_rand >= 12 && i_rand < 24) {
		await message.reply({ files : ["./src/commands/Fuck/images/Adrenal1.png"] })
	} else if (i_rand >= 24 && i_rand < 36) {
		await message.reply({ files : ["./src/commands/Fuck/images/Adrenal2.png"] })
	} else if (i_rand >= 36 && i_rand < 48) {
		await message.reply({ files : ["./src/commands/Fuck/images/Adrenal3.png"] })
	} else if (i_rand >= 48 && i_rand < 60) {
		await message.reply({ files : ["./src/commands/Fuck/images/Adrenal4.png"] })
    } else if (i_rand >= 60 && i_rand < 80) {
		await message.reply({ files : ["./src/commands/Fuck/images/Adrenal5.png"] })		
	} else {
		await message.reply({ files : ["./src/commands/Fuck/images/Adrenal6.png"] })
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
	const probabilities = [33,33,34];
    let newCase;
    do {
      newCase = weightedRandomCase(probabilities);
    } while (TootCases.includes(newCase));
	TootCases.shift();
	TootCases.push(newCase);
    
	switch (newCase) {
		case 0:
			await message.reply({ files : ["./src/commands/Fuck/images/WarTradesv2.gif"] })
			break;
		case 1:
			await message.reply({ files : ["./src/commands/Fuck/images/LisaTrades_V3.gif"] })
			break;
		default:
			await message.reply({ files : ["./src/commands/Fuck/images/DontTrade_v5.gif"] })
			break;
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
	const probabilities = [20, 30, 40, 5, 5];
    let newCase;
    do {
      newCase = weightedRandomCase(probabilities);
    } while (DangCases.includes(newCase));
	DangCases.shift();
	DangCases.push(newCase); 
	
    switch (newCase) {
		case 0:
			await message.reply({ files : ["./src/commands/Fuck/images/Dang1.png"] });
			break;
		case 1:
			await message.reply({ files : ["./src/commands/Fuck/images/peeinpool.gif"] })
			break;
		case 2:
			const fs = require('fs')
			const fileContent = fs.readFileSync('./src/commands/Fuck/images/Dangling.txt', 'utf-8');
			const lines = fileContent.split('\n');
			const line = lines[Math.floor(Math.random() * lines.length)]
			await message.reply(line)
			break;
		case 3:
			await message.reply("$dkng d")
			break;
		default:
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
		await message.reply("President of the year");
	} else if (i_rand < 20) {
		await message.reply("Protocol of the year");
	} else if (i_rand < 25) {
		await message.reply("Panic at the Disco of the year");
	} else if (i_rand < 30) {
		await message.reply("Paladin of the year");
	} else if (i_rand < 35) {
		await message.reply("Party of the year");
	} else if (i_rand < 40) {
		await message.reply("Princeps of the year");
	} else if (i_rand < 45) {
		await message.reply("Pistachio of the year");
	} else if (i_rand < 50) {
		await message.reply("Pan-European of the year");
	} else if (i_rand < 55) {
		await message.reply("Professor of the year");
	} else if (i_rand < 60) {
		await message.reply("Player of the year");
	} else if (i_rand < 65) {
		await message.reply("Polka dancer of the year");
	} else if (i_rand < 70) {
		await message.reply("Pastrami of the year");
	} else if (i_rand < 75) {
		await message.reply("Psyduck of the year");
	} else if (i_rand < 80) {
		await message.reply("Precipitation of the year");
	} else if (i_rand < 85) {
		await message.reply("Poet of the year");
	} else if (i_rand < 90) {
		await message.reply("Pharaoh of the year");
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

export const PmchemCommand: ICommand = {
  name: 'Pmchem',
  helpDescription: 'Pmchem',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!pmchem'),
  command: async (message: Message) => {	
		let url_fa = 'https://finviz.com/screener.ashx?v=111&f=cap_smallover,fa_epsqoq_pos,fa_pfcf_low,fa_roe_pos,fa_roi_o20,fa_salesqoq_o10,ta_sma200_pa,ta_sma50_pa&ft=4';
		const table1 = await getFinvizScreenWholeTable(url_fa);
		const arrayLength1 = Math.min(table1.length, 5);
		const fields1 = table1.slice(0, arrayLength1).map((value) => ({
			name: value.ticker,
			value: `Price: ${value.price} Change: ${value.change}`,
		}));
		await message.reply("!fa "+fields1[Math.floor(Math.random() * arrayLength1)-1].name)
		await message.reply("Remember goons: ***Price is what you pay; value is what you get.***")
    return Promise.resolve();
  },
};

export const PopCommand: ICommand = {
  name: 'Popping',
  helpDescription: 'Popping',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!popping'),
  command: async (message: Message) => {
	let i_rand =  Math.floor(Math.random() * 100); 
    if (i_rand < 33) {
		await message.reply("**PoppingFresh** is the truest ***COWARD***. Look how long it took him to make a command for himself...")
	} else if (i_rand >= 33 && i_rand < 66 ) {
		await message.reply({ files : ["./src/commands/Fuck/images/Pop1.png"] })
	} else {
		await message.reply({ files : ["./src/commands/Fuck/images/Pop2.png"] })
	}
    return Promise.resolve();
  },
};

export const LolCommand: ICommand = {
  name: 'Lol',
  helpDescription: 'Lol',
  showInHelp: false,
  trigger: (msg: Message) => (msg.author.id === '138980525225279488'),
  command: async (message: Message) => {
	if (message.content.includes('LOL')) {
		let i_rand =  Math.floor(Math.random() * 100);
		if (i_rand < 80) {
			await message.reply({ files : ["./src/commands/Fuck/images/yawn.gif"] })
		}
	} else {
		let i_rand =  Math.floor(Math.random() * 150); 
		if (i_rand == 22) {
			await message.reply("LOL")
			}
		if (i_rand == 44) {
			await message.reply("🥱")
			}
	}
    return Promise.resolve();
  },
};

export const RootootCommand: ICommand = {
  name: 'Rootoot',
  helpDescription: 'Rootoot',
  showInHelp: false,
  trigger: (msg: Message) => (msg.content.toLocaleLowerCase() === '!rootoot'),
  command: async (message: Message) => {
    const probabilities = [20, 20, 20, 20, 20];
    let newCase;
    do {
      newCase = weightedRandomCase(probabilities);
    } while (RootCases.includes(newCase));
	RootCases.shift();
	RootCases.push(newCase);
	
    switch (newCase) {
		case 0:
			await message.reply({ files : ["./src/commands/Fuck/images/root.jpg"] });
			break;
		case 1:
			await message.reply({ files : ["./src/commands/Fuck/images/root.png"] });
			break;
		case 2:
			await message.reply({ files : ["./src/commands/Fuck/images/root2.png"] });
			break;
		case 3:
			await message.reply({ files : ["./src/commands/Fuck/images/root3.png"] });
			break;
		default:
			await message.reply({ files : ["./src/commands/Fuck/images/root4.png"] });
			break;
	}
    return Promise.resolve();
  },
};