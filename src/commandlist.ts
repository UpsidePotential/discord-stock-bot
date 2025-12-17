import { ICommand } from './icommand';
import { FuturesCommand } from './commands/Futures';
import { CryptoCommand } from './commands/Crypto';
// import { ForexCommand } from './commands/Forex';
import {
  StocksCommand, StockCharts, HeatMap,
} from './commands/Stocks';
import {
  ScreenerCommand, BreakoutCommand, WinnersCommand, LosersCommand, PreMarketCommand, AfterHoursCommand,
} from './commands/Screener';
import { HelpCommand } from './commands/Help';
import { EventsCommand } from './commands/Events';
import { InfoCommand } from './commands/Info';

import { SQBestCommand, SQTickerCommand, SQWorstCommand } from './commands/sq';
import { FACommand } from './commands/FA';
import { StatsCommand } from './commands/Stats';

import { FuckCommand, GapperCommand, ManateeCommand, PastramiCommand, SepistCommand, RootootCommand } from './commands/Fuck';
import { PixaalCommand, NewHighCommand, NewLowCommand, ShitlordCommand, ZephCommand, BootmanjCommand } from './commands/Fuck';
import { MilkCommand, JoshCommand, ModsCommand, HurfCommand, AdrenalCommand, PmchemCommand, LolCommand } from './commands/Fuck';
import { WetGoodsCommand, TootersCommand, FlowinCommand, DanglingCommand, NetbusCommand,PopCommand,DunkmanCommand } from './commands/Fuck';
import { PotyCommand, PotyPassive, ToalyCommand, FreelanceCommand, AbeCommand, HitManCommand, KaygeeCommand } from './commands/Fuck';
import { DumpItCommand, PumpItCommand, LateCommand, MalakaCommand, JowsCommand, PoorCommand } from './commands/Fuck';
import { CorrelationCommand, RealizedVolCommand, RelRotGraphCommand, DressingCommand } from './commands/market_dashboard';
import { VolConeCommand, PairsCommand, CoTCommand, VixBinsCommand, VixReturnsCommand, RelChartCommand, VolSheetCommand } from './commands/market_dashboard';
import { VixCurveCommand, MomoDashCommand, MaxLossCommand, VRPCommand } from './commands/market_dashboard';
import { ExtendHoursCommand } from './commands/ExtendHours';

export const commandList: ICommand[] = [
  //FuturesCommand,
  //CryptoCommand,
  // ForexCommand,  DISABLE the FOREX command. it needs a better trigger
  //StocksCommand,
  //ScreenerCommand,
  //BreakoutCommand,
  //HelpCommand,
  //EventsCommand,
  //LosersCommand,
  //WinnersCommand,
  //PreMarketCommand,
  //AfterHoursCommand,
  //InfoCommand,
  //StockCharts,
  //SQBestCommand,
  //SQTickerCommand,
  //SQWorstCommand,
  //FACommand,
  //StatsCommand,
  //FuckCommand, ManateeCommand, PastramiCommand, SepistCommand,
  //PixaalCommand, NewHighCommand, NewLowCommand, ShitlordCommand,
  //ZephCommand, MilkCommand, JoshCommand, ModsCommand, HurfCommand,
  //AdrenalCommand, WetGoodsCommand, TootersCommand, FlowinCommand, 
  //DanglingCommand, NetbusCommand, PotyCommand, PotyPassive, KaygeeCommand,
  //ToalyCommand, FreelanceCommand, AbeCommand, HitManCommand, DunkmanCommand,
  //PmchemCommand, PopCommand, LolCommand, RootootCommand, BootmanjCommand,
  GapperCommand,
  //CorrelationCommand, RealizedVolCommand,
  //ExtendHoursCommand, RelRotGraphCommand,
  //DressingCommand, VolConeCommand,
  //PairsCommand, CoTCommand, VixBinsCommand, VixReturnsCommand,
  //VolSheetCommand, MomoDashCommand, MaxLossCommand,
  //RelChartCommand, VixCurveCommand, VRPCommand,
  //HeatMap, DumpItCommand, PumpItCommand, LateCommand, MalakaCommand,
  //JowsCommand, PoorCommand
];
