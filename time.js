/**
 * Older date first
 */
exports.isSameDay = (dateOne, dateTwo) => {
  return (dateOne.setHours(0, 0, 0, 0) - dateTwo.setHours(0, 0, 0, 0) >= 0)
}

exports.minsToHoursAndMins = timeInMins => {
  const time = {}
  time.hours = Math.floor(timeInMins / 60)
  time.minutes = timeInMins % 60
  return time
}

exports.msToMinutes = millis => {
  return Math.floor(millis / 60000)
}
