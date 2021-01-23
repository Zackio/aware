const { minsToHoursAndMins } = require('./time.js')

test('Test 0 hour and 20 minutes', () => {
  const result = minsToHoursAndMins(20)
  expect(result).toEqual({ hours: 0, minutes: 20 })
})

test('Test 1 hour and 0 minutes', () => {
  const result = minsToHoursAndMins(60)
  expect(result).toEqual({ hours: 1, minutes: 0 })
})

test('Test 1 hours and 40 minutes', () => {
  const result = minsToHoursAndMins(100)
  expect(result).toEqual({ hours: 1, minutes: 40 })
})

test('Test 2 hours and 25 minutes', () => {
  const result = minsToHoursAndMins(145)
  expect(result).toEqual({ hours: 2, minutes: 25 })
})