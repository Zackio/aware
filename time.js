
exports.minsToHoursAndMins = timeInMins => {
  const time = {}
  time.hours = Math.floor(timeInMins / 60)
  time.minutes = timeInMins % 60
  return time
}

exports.msToMinutes = millis => {
  return Math.floor(millis / 60000)
}
