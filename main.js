const { powerMonitor } = require('electron')
const exec = require('child_process').exec
const Store = require('./config-save.js')
const { minsToHoursAndMins, msToMinutes } = require('./time.js')

const message = [
  'consider taking a break',
  'You\'re pushing it',
  'Have you fallen down the rabbit hole',
  'Is this worth getting exhausted for'
]

let start = Date.now()
let count = 25
let tally = 0

// First instantiate the class
const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    tally: 0
  }
})

tally = store.get('tally')

const counter = from => {
  let i = from - 1

  return function () {
    i = (i + 1) % myArray.length
    return i
  }
}

function say (msg) {
  exec('say ' + msg)
  console.log(msg)
}

say('starting aware app')

const workingLoop = () => {
  const msElapsed = Date.now() - start
  const minutesElapsed = msToMinutes(msElapsed)
  if (minutesElapsed === (count + 5)) {
    count += 5
    let msg = `You have been working for ${count} minutes`
    if (count > 25) {
      msg += ', ' + getMessage()
    }
    say(msg)
  }
}

setInterval(workingLoop, 1000)

powerMonitor.on('resume', () => {
  say('Resuming')
  tally += count
  const time = minsToHoursAndMins(tally) // @todo not working, write test
  say(`You have been working for ${time.hours} hours and ${time.minutes} minutes`)
  count = 0
  start = Date.now()
})

powerMonitor.on('suspend', () => {
  console.log('suspending')
  clearInterval(workingLoop)
  console.log(count)
})
