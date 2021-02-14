const { powerMonitor, BrowserWindow } = require('electron')
const Store = require('./config-save.js')
const { counter } = require('./counter.js')
const { say } = require('./aware.lib.js')
const { minsToHoursAndMins, msToMinutes, isSameDay } = require('./time.js')
const debug = require('debug')('aware')

const message = [
  'consider taking a break',
  "You're pushing it",
  'Have you fallen down the rabbit hole',
  'Is this worth getting exhausted for'
]

let start = Date.now()
let count = 0
let tally = 0

// First instantiate the class
const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    tally: 0,
    date: Date()
  }
})

tally = store.get('tally')
debug('tally', tally)
debug('date', store.get('date'))

const indexCounter = counter(0, message.length)

say('starting aware app')

const workingLoop = () => {
  const msElapsed = Date.now() - start
  const minutesElapsed = msToMinutes(msElapsed)
  if (minutesElapsed === count + 5) {
    count += 5
    let msg = `You have been working for ${count} minutes`
    if (count > 25) {
	 msg += ', ' + message[indexCounter()]
    }
    say(msg)
  }
}

setInterval(workingLoop, 1000)

function workingForMsg (tally) {
  const time = minsToHoursAndMins(tally) // @todo not working, write test

  return `You have been working for ${time.hours} hours and ${time.minutes} minutes`
}

const resume = () => {
  say('Resuming')
  tally += count
  say(workingForMsg(tally))
  count = 0
  start = Date.now()
  const today = new Date()
  const storedDate = new Date(store.get('date'))
  debug('Today', today)
  debug('Stored Date', storedDate)
  if (!isSameDay(storedDate, today)) {
    tally = 0
    debug('Not same day, tally now', tally)
    // Test setting day manually to differnt day
  }
  store.set('tally', tally)
  store.set('date', today)
}

resume()
powerMonitor.on('resume', resume)

powerMonitor.on('suspend', () => {
  console.log('suspending')
  clearInterval(workingLoop)
  console.log(count)
})
