const { powerMonitor } = require('electron')
const exec = require('child_process').exec
const interval = 1000

let start = Date.now()
let count = 0

function msToMinutes (millis) {
  return Math.floor(millis / 60000)
}

function say (msg) {
  exec('say ' + msg)
}

say('starting aware app')

const workingLoop = () => {
  const msElapsed = Date.now() - start
  const minutesElapsed = msToMinutes(msElapsed)
  if (minutesElapsed === (count + 5)) {
    count += 5
    let msg = `You have been working for ${count} minutes`
    console.log(msg)
    if (count > 25) {
      msg += ', Consider taking a break'
    }
    say(msg)
  }
}

setInterval(workingLoop, interval)

powerMonitor.on('resume', () => {
  say('Resuming')
  count = 0
  start = Date.now()
  console.log('resuming')
})

powerMonitor.on('suspend', () => {
  console.log('suspending')
  clearInterval(workingLoop)
  console.log(count)
})
