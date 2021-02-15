## What is it? And why

An electron app I made for myself to help me be aware of how much time has passed in order for me to be more aware of how much time I have spent doing something and to encourage me to take breaks.

This app is auditory and tells you how many minutes has passed since you started working. After 25 minutes it will give you extra encouragement to take a break. 

The idea is it is less intrusive then a 'Take a break' app. It encourages you to take one rather then forcing you.

## How it works

It will sense when the computer goes to sleep, so when the lid is shut or goes idle. Then it will start counting and alert you every 5 minutes. 

Every time you resume it will tell you how long you have been working today. 

Each day it resets that tally.

## Stage of development

Early. I am using it and seems to work ok, but I made this for myself, if anyone else finds it useful, that's great.

## Made with

Electron. I would have prefered for it to be pure command line but I would need to figure out how to detect when the system is idle. Electron gives an easy cross platform way to do this.

## Platforms

At the moment it uses the mac's say command for speach, if you install say command for linux, I assume it would work but I haven't tested it.

      sudo apt-get install gnustep-gui-runtime

## Installation

On mac you can just drag the release binary to your applications folder. For any other platforms you would need to build the package for that system buy cloning this repo locally then running 

      npm package
