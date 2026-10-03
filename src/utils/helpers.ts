export const formatCurrencyINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (val: number): string => {
  return new Intl.NumberFormat('en-IN').format(val);
};
