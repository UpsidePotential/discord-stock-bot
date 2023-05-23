import { Message } from 'discord.js';
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