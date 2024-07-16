import moment from 'moment';

export function epochToDate(epochTime: number) {
  // Convert the epoch time to milliseconds.
  const x = new Date(epochTime);
  return moment(x.toISOString()).format('YYYY-MM-DD HH:mm:ss');
}

export function toEpoch(time: Date) {
  return new Date(time).getTime();
}

export function debounce(fn: Function, ms = 1000) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}
