import { AttachmentBuilder, Message } from 'discord.js';
import { ICommand } from '../../icommand';
import got from 'got';

export const CorrelationCommand: ICommand = {
  name: 'Correlation',
  helpDescription: '!corr [days] [tickers]  example: !corr 5 spy,qqq,^vix,btc-usd',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!corr'),
  command: async (message: Message, services: any) => {
  let days = "30";
  let tickers = "SPY,QQQ,IWM,TLT,GLD,USO,UUP,^VIX,BTC-USD";
  const args = message.content.toLowerCase().split(' ');
  if(args.length == 2)
  {
    days = args[1];
  }
  else if(args.length == 3)
  {
    days = args[1];
    tickers = args[2];
  }

  try{
    const image = await got(`${process.env.MARKET_DASHBOARD_URI}/correlation/${days}/${tickers}`);
    await message.channel
      .send(
        {
          files: [
            image.rawBody,
          ],
        },
      );
  
  } catch(e)
  {
    console.error(e);
    return Promise.resolve();
  }
 
    return Promise.resolve();
  },
};

export const RealizedVolCommand: ICommand = {
  name: '30 Day rolling Realized Vol',
  helpDescription: '!rvol [ticker]',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!rvol'),
  command: async (message: Message, services: any) => {
  let ticker = message.content.toLowerCase().split(' ')[1];
  try
  {
    const image = await got(`${process.env.MARKET_DASHBOARD_URI}/realized_vol/${ticker}`);

    await message.channel
        .send(
          {
            files: [
              image.rawBody,
            ],
          },
        );
  }
  catch(e)
  {
    console.error(e);
  }
 
    return Promise.resolve();
  },
};

export const RelRotGraphCommand: ICommand = {
  name: 'Relative Rotation Graphs',
  helpDescription: '!rrg',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!rrg'),
  command: async (message: Message, services: any) => {
  const rrg_set = message.content.split(' ')[1];

  try
  {

    const image = await got(`${process.env.MARKET_DASHBOARD_URI}/rrg/${rrg_set}`);

    await message.channel
        .send(
          {
            files: [
              image.rawBody,
            ],
          },
        );
  }
  catch(e)
  {
    console.error(e);
  }
 
    return Promise.resolve();
  },
};

export const DressingCommand: ICommand = {
  name: 'Window Dressing',
  helpDescription: '!dressing [ticker] [start_date (YYYY-MM-DD)] [end_date (YYYY-MM-DD)]',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!dressing'),
  command: async (message: Message, services: any) => {
  let ticker = "SPY";
  let start_date = "2010-01-01"
  let end_date = "2023-01-01"
  const args = message.content.toLowerCase().split(' ');
  if(args.length == 2)
  {
    ticker = args[1];
  }
  else if(args.length == 3)
  {
    ticker = args[1];
    start_date = args[2];
  }
  else if(args.length == 4)
  {
    ticker = args[1];
    start_date = args[2];
    end_date = args[3]
  }

  try{
    const image = await got(`${process.env.MARKET_DASHBOARD_URI}/dressingMain/${ticker}/${start_date}/${end_date}`);
    await message.channel
      .send(
        {
          files: [
            image.rawBody,
          ],
        },
      );
  
  } catch(e)
  {
    console.error(e);
    return Promise.resolve();
  }
 
    return Promise.resolve();
  },
};

export const VolConeCommand: ICommand = {
  name: 'Rvol Cone',
  helpDescription: '!cone [ticker] [start_date (YYYY-MM-DD)] [end_date (YYYY-MM-DD)]',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!cone'),
  command: async (message: Message, services: any) => {
  let ticker = "SPY";
  let start_date = "2022-01-01"
  let end_date = "2023-12-31"
  const args = message.content.toLowerCase().split(' ');
  if(args.length == 2)
  {
    ticker = args[1];
  }
  else if(args.length == 3)
  {
    ticker = args[1];
    start_date = args[2];
  }
  else if(args.length == 4)
  {
    ticker = args[1];
    start_date = args[2];
    end_date = args[3]
  }

  try{
    const image = await got(`${process.env.MARKET_DASHBOARD_URI}/IVCone/${ticker}/${start_date}/${end_date}`);
    await message.channel
      .send(
        {
          files: [
            image.rawBody,
          ],
        },
      );
  
  } catch(e)
  {
    console.error(e);
    return Promise.resolve();
  }
 
    return Promise.resolve();
  },
};

export const PairsCommand: ICommand = {
  name: 'Pair Trading Assessment',
  helpDescription: '!pairs [ticker 1] [ticker 2] \n This command is a bit involved. Use !pairs help for more info.',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!pairs'),
  command: async (message: Message, services: any) => {
  
  const args = message.content.toLowerCase().split(' ');
  let ticker_1 = "";
  let ticker_2 = "";
  if(args.length == 2)
  {
    ticker_1 = args[1];
	ticker_2 = "";
	if(ticker_1 == 'help')
	{
	    message.channel.send({
        embeds: [{
        color: 3447003,
        title: 'Pairs Trader Overview',
		description: 'Choose two tickers with the !pairs command. It generates graphs of the spread between these \
		              two tickers at 180 and 60 day history. The idea is that this spread will mean-revert. \n When \
					  the Z-score is positive, you short Ticker 1 and long (Beta x Ticker 2) to play for the reversion. When \
					  the Z-score is negative, the opposite is true (long Ticker 1 and short Beta x Ticker 2). \n See \
					  https://www.youtube.com/watch?v=dQ2aAtC-ouk for more info.',
        fields: [
          { name: 'Plots',value:'Red = mean, Blue = One StDev, Cyan = Two StDev'},
          { name: 'Beta',value:'Represents the ratio that the second ticker should be traded at. (i.e. Long/short ratio 1:Beta)'},
          { name: 'R Squared',value:'The R squared value of the linear regression of ticker_1 vs ticker_2. Values closer to 1 have a better fit.' },
		  { name: 'LinReg Pval',value:'P-value for the linear regression statistics. Values closer to 0 are best.' },
		  { name: 'ADF',value:'Augmented Dickey Fuller test to see if the timeseries (ticker spread) is in fact mean reverting. Values closer to 0 are best.' },
		  { name: 'Z-score',value:'The current standard deviation of where the spread is currently. More extended values are best' }, 
          ],
		footer: {text:'Green, yellow, and red colors are assigned based on how confident you can be with the trade. \
		         Do not use if you are not familiar with the theory behind the trade.'
				 },
          },
          ],
        });
	}
  }
  else if(args.length == 3)
  {
    ticker_1 = args[1];
    ticker_2 = args[2];
  
    try{
      const image = await got(`${process.env.MARKET_DASHBOARD_URI}/pairsMaster/${ticker_1}/${ticker_2}`);
      await message.channel
        .send(
          {
            files: [
              image.rawBody,
            ],
          },
        );
  
      } catch(e)
    {
      console.error(e);
      return Promise.resolve();
    }
 
      return Promise.resolve();
  }
  },
};


export const CoTCommand: ICommand = {
  name: 'Commitment of Traders Charts',
  helpDescription: '!cot [ticker]',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!cot'),
  command: async (message: Message, services: any) => {
  let ticker = "es";
  const args = message.content.toLowerCase().split(' ');
  if(args.length == 2)
  {
    ticker = args[1].replace(/\//g, "");
  }

  if(ticker == 'help')
	{
	    message.channel.send({
        embeds: [{
        color: 3447003,
        title: 'Commitment of Traders Overview',
		description: "The Commitment of Traders reports the positioning of large speculators, retail, and commercial enteties every week in a number of futures-based products \n \
					  The general idea is that a trade gets crowded when large specs and retail (NC and NR) are really long or really short in a particular product. \n \
					  If the trade is crowded long (short), then if the underlying starts to sell off (get bought), this will cause momentum in the other direction due to people taking profits or \
					  getting their stops triggered. It's a momemtum strategy and more info can be found here: https://www.youtube.com/watch?v=xvnT9tTov-E https://www.youtube.com/watch?v=PbEAwOaeTs0 https://www.youtube.com/watch?v=b2DB_XoJxyI",
        fields: [
          { name: 'Products',value:'Use **!cot list** to see all CoT figures'},
          { name: 'Non Commercial (NC)',value:'Larger speculators in the market (hedge funds, family offices, investment banks)' },
		  { name: 'Non Reportable (NR)',value:'Other speculators that do not reach the amount of money needed to be included with the NC group (i.e. retail)' },
		  { name: 'Commercial (C)',value:'Commercial which includes market-makers or actual producers of the physical products.' },
          ],
          },
          ],
        });
	}
	if(ticker == 'list')
	{
	    message.channel.send({
        embeds: [{
        color: 3447003,
        title: 'List of CoT Products',
		description: 'The following is the list of CoT products. Reach out to PoppingFresh to get more added. \n \
					   The lists are ordered by what they are and how to call them using the !cot command. Listed in 5x5 for aesthetic reasons.',
        fields: [
          { name: 'Wheat, Corn, Oats, 20y+ bonds, 2y Bonds',value:'zw, zc, oats, zb, 2y'},
          { name: '10y bonds, 5y bonds, Dow Jones, Lean Hogs, Cattle',value:'10y, 5y, ym, lh, cow'},
          { name: 'Lumber, CADUSD, CHFUSD, MXNUSD, GPBUSD',value:'ll, 6c, 6s, 6m, 6b' },
		  { name: 'JPYUSD, EURUSD, BRLUSD, NZDUSD, SARUSD',value:'6j, 6e, 6l, 6n, 6z' },
		  { name: 'BTCUSD, S&P500, ETHUSD, NASDAQ100, AUSUSD',value:'btc, es, eth, nq, 6a' },
		  { name: 'Russell 2k, VIX, Silver, Copper, Gold',value:'rty, vix, si, hg, gc' },
		  { name: 'Cobalt, Cotton, Orange Juice, Cocoa, Sugar',value:'co, cotton, oj, cocoa, sugar' },
		  { name: 'Coffee, Nat Gas, Propane, WTI Crude Oil, Palladium',value:'coffee, ng, propane, cl, pall' },
		  { name: 'Platinum, Gasoline',value:'pt, gasoline' },
          ],
		footer: {text:'Usage is !cot <ticker> (ex. !cot es    generates the CoT figure for S&P500 futures)'
				 },
          },
          ],
        });
	}
  try{
    const image = await got(`${process.env.MARKET_DASHBOARD_URI}/cotchart/${ticker}`);
    await message.channel
      .send(
        {
          files: [
            image.rawBody,
          ],
        },
      );
  
  } catch(e)
  {
    console.error(e);

  }
 
    return Promise.resolve();
  },
};

export const VixBinsCommand: ICommand = {
  name: 'Vix Bin Graphs',
  helpDescription: '!vixbin',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!vixbin'),
  command: async (message: Message, services: any) => {
  const rrg_set = message.content.split(' ')[1];

  try
  {

    const image = await got(`${process.env.MARKET_DASHBOARD_URI}/vixbins`);

    await message.channel
        .send(
          {
            files: [
              image.rawBody,
            ],
          },
        );
  }
  catch(e)
  {
    console.error(e);

  }
 
    return Promise.resolve();
  },
};

export const VixReturnsCommand: ICommand = {
  name: 'Vix Next Day Returns Graphs',
  helpDescription: '!vixnext',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!vixnext'),
  command: async (message: Message, services: any) => {
  const rrg_set = message.content.split(' ')[1];

  try
  {

    const image = await got(`${process.env.MARKET_DASHBOARD_URI}/vix_next_day`);

    await message.channel
        .send(
          {
            files: [
              image.rawBody,
            ],
          },
        );
  }
  catch(e)
  {
    console.error(e);

  }
 
    return Promise.resolve();
  },
};


export const RelChartCommand: ICommand = {
  name: 'Relative Percent Chart',
  helpDescription: '!rel [ticker1] [ticker2] [start_date (YYYY-MM-DD)] [end_date (YYYY-MM-DD)]',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!rel'),
  command: async (message: Message, services: any) => {
  let ticker_1 = "SPY";
  let ticker_2 = "QQQ"
  let start_date = "1111-11-11"
  let end_date = "1111-11-11"
  const args = message.content.toLowerCase().split(' ');
  if(args.length == 2)
  {
    ticker_1 = args[1];
  }
  else if(args.length == 3)
  {
    ticker_1 = args[1];
    ticker_2 = args[2];
  }
  else if(args.length == 4)
  {
    ticker_1 = args[1];
	ticker_2 = args[2]
    start_date = args[3];
  }
  else if(args.length == 5)
  {
    ticker_1 = args[1];
	ticker_2 = args[2]
    start_date = args[3];
	end_date = args[4]
  }
  try{
    const image = await got(`${process.env.MARKET_DASHBOARD_URI}/relChartMain/${ticker_1}/${ticker_2}/${start_date}/${end_date}`);
    await message.channel
      .send(
        {
          files: [
            image.rawBody,
          ],
        },
      );
  
  } catch(e)
  {
    console.error(e);
    return Promise.resolve();
  }
    return Promise.resolve();
  },
};


export const VolSheetCommand: ICommand = {
  name: 'Volatility Summary',
  helpDescription: 'Generates tearsheet of vol models',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!vixmodels'),
  command: async (message: Message, services: any) => {
  /* let i_rand =  Math.floor(Math.random() * 100);
  if (i_rand < 20) {
	await message.reply({ files : ["./src/commands/Fuck/images/vixmemories.png"] })
	} */
  try{
    const image2 = await got(`${process.env.MARKET_DASHBOARD_URI}/volSheetMain`);
	  await message.channel.send({files: [image2.rawBody]});
    //const image = await got(`https://raw.githubusercontent.com/Poppingfresh/CoT_Repo/refs/heads/main/lov.png`);
	  //await message.channel.send({files: [image.rawBody]});
  } catch(e)
  {
    console.error(e);
    return Promise.resolve();
  }
    return Promise.resolve();
  },
};

export const VixCurveCommand: ICommand = {
  name: 'Vix Curve',
  helpDescription: 'Generates VIX futures curve',
  showInHelp: true,
  trigger: (msg: Message) => (msg.content.startsWith('!vix')),
  command: async (message: Message, services: any) => {
    try {
      const res = await got(`${process.env.MARKET_DASHBOARD_URI}/vixCurveMain`, {
        responseType: 'buffer'
      });
    
      const attachment = new AttachmentBuilder(res.body, {
        name: `vixCurveMain_${Date.now()}.png`, // cache-busting filename
      });
    
      await message.channel.send({ files: [attachment] });
  } catch(e)
  {
    console.error(e);
    return Promise.resolve();
  }
    return Promise.resolve();
  },
};

export const MomoDashCommand: ICommand = {
  name: 'Momemtum Dashboard',
  helpDescription: 'Generates momentum dashboard',
  showInHelp: true,
  trigger: (msg: Message) => (msg.content.startsWith('!market')),
  command: async (message: Message, services: any) => {
  try{
    let ftype = '1';
    const image = await got(`${process.env.MARKET_DASHBOARD_URI}/momo_dash/${ftype}`);

    await message.channel
      .send(
        {
          files: [
            image.rawBody,
          ],
        },
      );
	  
	const image2 = await got(`https://github.com/Poppingfresh/CoT_Repo/blob/main/stockbee_tab.png?raw=true`);
	await message.channel.send({files: [image2.rawBody]});
    
  const image3 = await got(`https://github.com/Poppingfresh/CoT_Repo/blob/main/market_tab3.png?raw=true`);
	await message.channel.send({files: [image3.rawBody]});
  
  } catch(e)
      {
        console.error(e);
        return Promise.resolve();
      }
    return Promise.resolve();
  },
};

export const MaxLossCommand: ICommand = {
  name: 'StdDev price based on 1-yr history',
  helpDescription: '!maxloss [ticker]',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!maxloss'),
  command: async (message: Message, services: any) => {
  let ticker = "AAPL";
  const args = message.content.toLowerCase().split(' ');
  if(args.length == 2)
  {
    ticker = args[1];
  }
  try{
    const image = await got(`${process.env.MARKET_DASHBOARD_URI}/maxloss/${ticker}`);
	if(image.body === 'null') {
		await message.reply("Invalid ticker you jerk.")
	} else {
		await message.channel
		  .send(
			{
			  files: [
				image.rawBody,
			  ],
			},
		  );
	}  
  } catch(e)
  {
    console.error(e);
    return Promise.resolve();
  }
    return Promise.resolve();
  },
};

export const VRPCommand: ICommand = {
  name: 'Vol Risk estimates',
  helpDescription: '!vrp',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!vrp'),
  command: async (message: Message, services: any) => {
	const image = await got(`https://github.com/Poppingfresh/CoT_Repo/blob/main/Figs/3_1_IV_contango.png?raw=true`);
	await message.channel.send({files: [image.rawBody]});
	const image2 = await got(`https://github.com/Poppingfresh/CoT_Repo/blob/main/Figs/VRPremia.png?raw=true`);
	await message.channel.send({files: [image2.rawBody]});
	return Promise.resolve();
  },
};
