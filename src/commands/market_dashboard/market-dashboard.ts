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
