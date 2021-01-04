const { powerMonitor } = require('electron')
const exec = require('child_process').exec
const interval = 300000

let count = 0

function say (msg) {
  exec('say ' + msg)
}

say('starting aware app')

const workingLoop = () => {
  count += 5
  say(`You have been working for ${count} minutes`)
  console.log(`You have been working for ${count} minutes`)
  if (count > 25) {
    say('Consider taking a break')
  }
}

setInterval(workingLoop, interval)

powerMonitor.on('resume', () => {
  say('Resuming')
  count = 0
  console.log('resuming')
  setInterval(workingLoop, interval)
})

powerMonitor.on('suspend', () => {
  console.log('suspending')
  clearInterval(workingLoop)
  console.log(count)
})
