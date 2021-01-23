const { counter } = require('./counter.js')

test('Counter 0 start', () => {
  const count = counter(0, 5)
  expect(count()).toBe(0)
})

test('Counter 1 start', () => {
  const count = counter(1, 5)
  expect(count()).toBe(1)
})

test('Counter 0 start, 2 calls', () => {
  const count = counter(0, 5)
   count()
  expect(count()).toBe(1)
})

test('Counter 0 start, loop to start', () => {
  const count = counter(0, 3)
   count()
   count()
   count()
  expect(count()).toBe(0)
})

test('Counter 1 start, loop to start', () => {
  const count = counter(1, 3)
   count()
   count()
   count()
  expect(count()).toBe(1)
})



















test('Counter 1 start', () => {
  const count = counter(1, 5)
  expect(count()).toBe(1)
})
