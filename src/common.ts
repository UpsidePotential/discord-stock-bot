export type OptionsKey = 'indicators' | 'chart_type' | 'time_period' | 'time_period_futures' | 'time_period_forex';

export const extractFromOptions = (key: OptionsKey, options: string[]): string => {
  if (key === 'indicators') {
    let tempIndicator = '';
    let indicators = [];

    for (let i = 0; i < options.length; i++) {

      //allow for period selection i.e. $spy sma20 ema12 etc.
      const [item, period] = options[i].match(/\D+|\d+/g);

      if (item && period) {

        // indicator + period + random hex color
        indicators.push([item, period, Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")]);
      
      } else {
        switch (item) {
          case 'borc':
            indicators.push(['bb', 20, '2980b9']);
            indicators.push(['bb', 50, '3498db']);
            break;
          case 'hilo':
            indicators.push(['hilo', 20, 'a9dfbf']);
            break;
          case 'ema':
            indicators.push(['ema', 9, 'c0392b']);
            indicators.push(['ema', 21, '0317fc']);
            break;
          case 'vwap':
            indicators.push(['vwap', 0, '7d3c98']);
            break;
          case 'sma':
            indicators.push(['sma', 20, 'FF8F33C6']);
            indicators.push(['sma', 50, 'DCB3326D']);
            indicators.push(['sma', 200, 'DC32B363']);
            break;
          default:
        }
      }
    }
    if (indicators.length) {
        // add trendlines
        indicators.push(['patterns', 0, '000']);
        for (let i = 0; i < indicators.length; i++) {
          tempIndicator += '&o['+i+'][ot]='+indicators[i][0];
          tempIndicator += '&o['+i+'][op]='+indicators[i][1];
          tempIndicator += '&o['+i+'][oc]='+indicators[i][2];
        }
    } else {
      // base case - smas & trendlines
      tempIndicator = '&o[0][ot]=sma&o[0][op]=20&o[0][oc]=FF8F33C6&o[1][ot]=sma&o[1][op]=50&o[1][oc]=DCB3326D&o[2][ot]=sma&o[2][op]=200&o[2][oc]=DC32B363&o[3][ot]=patterns&o[3][op]=&o[3][oc]=000';
    }
    return tempIndicator;

  } if (key === 'chart_type') {
    let tempChartType = 'candle_stick';
    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      switch (item) {
        case 'line':
          tempChartType = 'line';
          break;
        default:
      }
    }
    return tempChartType;
  } if (key === 'time_period') {
    let tempTimePeriod = 'i5';
    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      switch (item) {
        case 'm':
          tempTimePeriod = 'm';
          break;
        case 'w':
          tempTimePeriod = 'w';
          break;
        case 'd':
          tempTimePeriod = 'd';
          break;
    case '4h':
          tempTimePeriod = 'h4';
          break;
    case 'h':
          tempTimePeriod = 'h';
          break;
    case '60':
          tempTimePeriod = 'h';
          break;
    case '30':
          tempTimePeriod = 'i30';
          break;
        case '15':
          tempTimePeriod = 'i15';
          break;
        case '3':
          tempTimePeriod = 'i3';
          break;
    case '1':
          tempTimePeriod = 'i1';
          break;
        default:
      }
    }
    return tempTimePeriod;
  } if (key === 'time_period_futures') {
    let tempTimePeriod = 'i5';
    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      switch (item) {
      case '1':
          tempTimePeriod = 'i1';
          break;
      case '3':
          tempTimePeriod = 'i3';
          break;
      case '15':
          tempTimePeriod = 'i15';
          break;
      case '30':
          tempTimePeriod = 'i30';
          break;
    case '60':
          tempTimePeriod = 'h';
          break;
        case 'h':
          tempTimePeriod = 'h';
          break;
    case '4h':
          tempTimePeriod = 'h4';
          break;
        case 'd':
          tempTimePeriod = 'd';
          break;
        case 'w':
          tempTimePeriod = 'w';
          break;
        case 'm':
          tempTimePeriod = 'm';
          break;
        default:
      }
    }
    return tempTimePeriod;
  } if (key === 'time_period_forex') {
    let tempTimePeriod = 'm5';
    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      switch (item) {
        case 'h':
          tempTimePeriod = 'h1';
          break;
        case 'd':
          tempTimePeriod = 'd1';
          break;
        case 'w':
          tempTimePeriod = 'w1';
          break;
        case 'm':
          tempTimePeriod = 'mo';
          break;
        default:
      }
    }
    return tempTimePeriod;
  }
  return '';
};
