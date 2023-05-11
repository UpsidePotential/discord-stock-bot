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
  try
  {

    const image = await got('${process.env.MARKET_DASHBOARD_URI}/rrg');

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
    const image = await got(`${process.env.MARKET_DASHBOARD_URI}/dressing/${ticker}/${start_date}/${end_date}`);
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
