export const formatNumber = (valueFormat) => {
  const value = `${valueFormat}`.trim().replace(/\s\s+/g, " ");
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const paserValue = (value) => {
  return `${value}`.replace(/\$\s?|(,*)/g, "");
};
