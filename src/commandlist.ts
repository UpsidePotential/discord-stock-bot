import { ICommand } from './icommand';
import { FuturesCommand } from './commands/Futures';
import { CryptoCommand } from './commands/Crypto';
// import { ForexCommand } from './commands/Forex';
import {
  StocksCommand, StockCharts,
} from './commands/Stocks';
import {
  ScreenerCommand, BreakoutCommand, WinnersCommand, LosersCommand,
} from './commands/Screener';
import { HelpCommand } from './commands/Help';
import { EventsCommand } from './commands/Events';
import { TickerTrackerCommand } from './commands/TickerTracker';
import { InfoCommand } from './commands/Info';

import { SQBestCommand, SQTickerCommand, SQWorstCommand } from './commands/sq';
import { FACommand } from './commands/FA';
import { StatsCommand } from './commands/Stats';

import { FuckCommand, GapperCommand } from './commands/Fuck';
import { CorrelationCommand, RealizedVolCommand, RelRotGraphCommand, DressingCommand } from './commands/market_dashboard';
import { VolConeCommand, PairsCommand, CoTCommand, VixBinsCommand, RelChartCommand } from './commands/market_dashboard';
import { ExtendHoursCommand } from './commands/ExtendHours';

export const commandList: ICommand[] = [
  FuturesCommand,
  CryptoCommand,
  // ForexCommand,  DISABLE the FOREX command. it needs a better trigger
  StocksCommand,
  ScreenerCommand,
  BreakoutCommand,
  HelpCommand,
  EventsCommand,
  TickerTrackerCommand,
  LosersCommand,
  WinnersCommand,
  InfoCommand,
  StockCharts,
  SQBestCommand,
  SQTickerCommand,
  SQWorstCommand,
  FACommand,
  StatsCommand,
  FuckCommand,
  GapperCommand,
  CorrelationCommand, RealizedVolCommand,
  ExtendHoursCommand, RelRotGraphCommand,
  DressingCommand, VolConeCommand,
  PairsCommand, CoTCommand, VixBinsCommand,
  RelChartCommand,
];
