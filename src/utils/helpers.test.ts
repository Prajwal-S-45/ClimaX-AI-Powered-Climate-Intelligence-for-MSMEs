import { describe, expect, it } from 'vitest';
import { formatCurrencyINR, formatNumber } from './helpers';

describe('formatCurrencyINR', () => {
  it('formats rupee values using Indian digit grouping', () => {
    expect(formatCurrencyINR(100000)).toContain('1,00,000');
    expect(formatCurrencyINR(300000)).toContain('3,00,000');
  });

  it('formats zero', () => {
    expect(formatCurrencyINR(0)).toContain('0');
  });
});

describe('formatNumber', () => {
  it('uses Indian digit grouping', () => {
    expect(formatNumber(1234567)).toBe('12,34,567');
  });
});
