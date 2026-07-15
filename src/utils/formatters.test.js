import { describe, expect, it } from 'vitest';
import { currency, titleCase } from './formatters';

describe('formatters', () => {
  it('formats Indian rupee currency', () => {
    expect(currency(11800)).toBe('₹11,800');
  });

  it('formats enum labels as readable text', () => {
    expect(titleCase('UNDER_REVIEW')).toBe('Under Review');
  });
});
