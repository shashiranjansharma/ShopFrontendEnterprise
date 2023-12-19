import moment from 'moment'

export function epochToDate(epochTime: number) {
  // Convert the epoch time to milliseconds.
  const x = new Date(epochTime)
  return moment(x.toISOString()).format('YYYY-MM-DD HH:mm:ss')
}

export function toEpoch(time: Date) {
  return new Date(time).getTime()
}
