import 'jasmine';

import {
  extractFromOptions, OptionsKey,
} from './common';

describe('Common', () => {
  interface TestData {
    key: OptionsKey;
    options: any;
    result: string;
  }
  const testData: TestData[] = [
    { key: 'indicators', options: ['vwap'], result: '&o[0][ot]=vwap&o[0][op]=0&o[0][oc]=7d3c98&o[1][ot]=patterns&o[1][op]=0&o[1][oc]=000' },
    { key: 'indicators', options: [], result: '&o[0][ot]=sma&o[0][op]=20&o[0][oc]=FF8F33C6&o[1][ot]=sma&o[1][op]=50&o[1][oc]=DCB3326D&o[2][ot]=sma&o[2][op]=200&o[2][oc]=DC32B363&o[3][ot]=patterns&o[3][op]=&o[3][oc]=000' },
    { key: 'chart_type', options: ['line'], result: 'line' },
    { key: 'chart_type', options: [], result: 'candle_stick' },
    { key: 'time_period', options: ['m'], result: 'm' },
    { key: 'time_period', options: [], result: 'i5' },
    { key: 'time_period_futures', options: ['d'], result: 'd' },
    { key: 'time_period_forex', options: ['w'], result: 'w1' },
  ];

  testData.forEach((i) => it(`extractFromOptions ${i.key} ${i.options}`, () => {
    expect(extractFromOptions(i.key, i.options)).toBe(i.result);
  }));
});
