export const getSubtotal = function (items) {
  let subTotal = 0;
  for (let i = 0; i < items.length; ++i) {
    if (items[i].quantity <= items[i].stockLevel) {
      subTotal += items[i].price * items[i].quantity;
    }
  }
  return round(subTotal);
};
export const getVat = function (items) {
  return round((getSubtotal(items) / 100) * 20);
};
export const getTotal = function (items) {
  return round(getSubtotal(items) + getVat(items));
};
export const round = function (value, decimals = 2) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};
