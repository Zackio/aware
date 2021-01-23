const exec = require('child_process').exec

module.exports.say = msg => {
  exec('say ' + msg)
  console.log(msg)
}
