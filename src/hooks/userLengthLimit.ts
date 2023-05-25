/*
 * @Author: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @Date: 2022-10-24 15:14:06
 * @LastEditors: xinlan212 57346229+xinlan212@users.noreply.github.com
 * @LastEditTime: 2022-10-28 10:46:39
 * @FilePath: \metapro-pc\src\hooks\userLengthLimit.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const lengthLimit = (
  value: any,
  length: number,
  type: boolean = true,
  keyword?: string
) => {
  value = typeof value != 'string' ? String(value) : value;
  if (!type) {
    let test = /-|\.|\+/;
    if (test.test(value)) {
      value = value.replace(test, '');
    }
  }
  if (value.includes('.')) {
    console.log(value, keyword);
    if (keyword === 'DeIta' || keyword === 'Service') {
      let index = value.indexOf('.');
      let left = value.slice(0, index);
      let right = value.slice(index + 1);
      let right_length = keyword === 'DeIta' ? 4 : 2;
      if (left.length >= 2 && right.length >= right_length) {
        return (value =
          left.slice(0, length) + '.' + right.slice(0, right_length));
      } else if (left.length >= 1 && right.length >= right_length) {
        return (value =
          left.slice(0, length) + '.' + right.slice(0, right_length));
      } else return value;
    } else {
      if (value.length > length + 1) return value.slice(0, length + 1);
      else return value;
    }
  } else if (value.includes('-')) {
    value.replace(/-/g, '');
  } else {
    if (value.length > length) return value.slice(0, length);
    else return value;
  }
};
export default lengthLimit;
