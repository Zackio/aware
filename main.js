const { app, powerMonitor } = require("electron");
const Store = require("./config-save.js");
const { counter } = require("./counter.js");
const { say } = require("./aware.lib.js");
const { minsToHoursAndMins, msToMinutes } = require("./time.js");

const message = [
   "consider taking a break",
   "You're pushing it",
   "Have you fallen down the rabbit hole",
   "Is this worth getting exhausted for",
];

let start = Date.now();
let count = 0;
let tally = 0;

// First instantiate the class
const store = new Store({
   // We'll call our data file 'user-preferences'
   configName: "user-preferences",
   defaults: {
      tally: 0,
   },
});

tally = store.get("tally");

let indexCounter = counter(0, message.length);

say("starting aware app");

const workingLoop = () => {
   const msElapsed = Date.now() - start;
   const minutesElapsed = msToMinutes(msElapsed);
   if (minutesElapsed === count + 5) {
      count += 5;
      let msg = `You have been working for ${count} minutes`;
      if (count > 25) {
	 msg += ", " + message[indexCounter()];
      }
      say(msg);
   }
};

setInterval(workingLoop, 1000);

app.on('before-quit', () => {
   say('Quitting')
   say(tally)
   store.set('tally', tally);
})

function workingForMsg(tally) {
   const time = minsToHoursAndMins(tally); // @todo not working, write test
   
    return  `You have been working for ${time.hours} hours and ${time.minutes} minutes`
}

powerMonitor.on("resume", () => {
   say("Resuming");
   tally += count;
   say ( workingForMsg(tally) )
   count = 0;
   start = Date.now();
});

powerMonitor.on("suspend", () => {
   console.log("suspending");
   clearInterval(workingLoop);
   console.log(count);
});
