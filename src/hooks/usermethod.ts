//防抖是在用户多次触发事件，当用户停止触发事件，将事件执行一次；节流是用户多次触发事件，会在多次触发的过程中，间隔执行事件。

const debounce = (fun: any, delay: number = 1500): any => {
  let timer: any;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(this, args);
    }, delay);
  };
};

const thorttle = (fun: any, delay: number = 1500): any => {
  let flag = true;
  let timer: any;
  return (...args: any) => {
    if (!flag) {
      return;
    }
    flag = false;
    timer = setTimeout(() => {
      fun.apply(this, args);
      flag = true;
    }, delay);
  };
};

export { debounce, thorttle };
