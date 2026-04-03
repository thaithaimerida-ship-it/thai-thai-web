export const formatCurrency = (value) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(value);

export const formatPercent = (value) =>
  `${Number(value).toFixed(2)}%`;
