const { powerMonitor } = require('electron')
const exec = require('child_process').exec
const interval = 300000
//const interval = 10000

let count = 0

function say (msg) {
  exec('say ' + msg)
}

say('starting aware app')

const workingLoop = () => {
  count += 5
  let msg = `You have been working for ${count} minutes`
  console.log(msg)
  if (count > 25) {
    msg += ', Consider taking a break'
  }

  say( msg );
}

setInterval(workingLoop, interval)

powerMonitor.on('resume', () => {
  say('Resuming')
  count = 0
  console.log('resuming')
})

powerMonitor.on('suspend', () => {
  console.log('suspending')
  clearInterval(workingLoop)
  console.log(count)
 })
