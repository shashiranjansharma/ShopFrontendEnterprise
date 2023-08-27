import moment from 'moment'

export function convertEpochToDate(epochTime: number) {
  // Convert the epoch time to milliseconds.
  return moment(epochTime).format('MMM Do YYYY, h:mm a')
}
