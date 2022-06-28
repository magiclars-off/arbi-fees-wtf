import { BigNumberish, constants } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

const UNITS = ['', 'K', 'M', 'B', 'T', 'Q'];

export const abbreviatePrice = (number: number | string, decimals?: number) => {
  if (!number) return 0;

  let formatted_number = typeof number === 'number' ? number : +number;
  let unit_index = 0;

  while (Math.floor(formatted_number / 1000.0) >= 1) {
    // Jump up a 1000 bracket and round to 1 decimal
    formatted_number = Math.round(formatted_number / 100.0) / 10.0;
    unit_index += 1;
  }

  const unit = UNITS[unit_index] ?? '';

  return formatted_number.toFixed(decimals ?? 1).replace(/\.0+$/, '') + unit;
};

export const formatNumber = (number: number) => new Intl.NumberFormat().format(number);
export const formatPrice = (price: BigNumberish) => formatNumber(parseFloat(formatEther(price ?? constants.Zero)));
