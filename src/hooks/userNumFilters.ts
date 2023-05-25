// top4 5位数计算
const numFilters = (value: string) => {
  if (typeof value === 'string' && String(value).includes('.')) {
    let index = value.indexOf('.');
    let left = value.substring(0, index);
    let right = value.substring(index, value.length);
    if (left.length === 1)
      return supplement(
        String(Number(left) + Number(Number(right).toFixed(4)))
      );
    if (left.length === 2)
      return supplement(
        String(Number(left) + Number(Number(right).toFixed(3)))
      );
    if (left.length === 3)
      return supplement(
        String(Number(left) + Number(Number(right).toFixed(2)))
      );
    if (left.length === 4)
      return supplement(
        String(Number(left) + Number(Number(right).toFixed(1)))
      );
    if (left.length >= 5)
      return supplement(
        String(Number(left) + Number(Number(right).toFixed(0)))
      );
  } else {
    if (value === '--') return '--';
    return supplement(String(Number(value).toFixed(4)));
  }
};

const supplement = (price: string) => {
  if (!price.includes('.')) {
    let length = price.length;
    if (length === 4) return price + '.0';
    if (length === 3) return price + '.00';
    if (length === 2) return price + '.000';
    if (length === 1) return price + '.0000';
  }
  if (price && !String(price).includes('-') && price.includes('.')) {
    let length = price.indexOf('.');
    let left = price.substring(0, length);
    let right = price.substring(length + 1);
    if (right.length >= 4) return Number(price).toFixed(4);
    if (right.length === 1 && left.length === 1) return price + '000';
    if (
      (right.length === 2 && left.length === 1) ||
      (right.length === 1 && left.length === 2)
    )
      return price + '00';
    if (
      (right.length === 3 && left.length === 1) ||
      (right.length === 1 && left.length === 3) ||
      (right.length === 2 && left.length === 2)
    )
      return price + '0';
    if (
      (right.length === 3 && left.length === 2) ||
      (right.length === 1 && left.length === 4) ||
      (right.length === 4 && left.length === 1)
    )
      return price;
  } else return price;
};

export default numFilters;
