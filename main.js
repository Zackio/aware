const {powerMonitor} = require('electron'); 
 const exec = require('child_process').exec;
const interval = 300000;

let count = 0;
let idleFlag = false;

// @todo folow this example to stop loop https://stackoverflow.com/questions/1795100/how-to-exit-from-setinterval
function workingLoop() {
  console.log('working Loop started');
  setInterval(function() {
      
   let idle = powerMonitor.getSystemIdleTime() // it returns in seconds when I am writing this
    console.log('Current System Idle Time - ', idle);
    if( idle > 10 ) {
      idleFlag = true;
      count = 0;
      console.log(`You've become idle`);
      startIdleLoop();
      exit;
    }

    if( idleFlag === true ) {
      console.log('idle flag is true');
    }

    count+=5;
    exec(`say You have been working or ${count} minutes`);
    console.log(`hello 2`);

  }, 3000); // 5 minute
}

workingLoop();

function startIdleLoop() {
 setInterval( function() {
  console.log('Idle loop started');
  }, 3000);
}

