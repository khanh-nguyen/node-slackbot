# node-slackbot

A simple Slack bot written in NodeJS.

## How to use it
* In Slack, add a bot integrations. Copy the generated token.
* Set constants in `constants.js`
* Deploy to your app server, e.g. Heroku
* Set credential information on the server: token, and other information. 

## What this bot does
* It sends out messsage on `#general` channel at time defined by your cron rule.

## TODO
* Welcome newcomers
* Notify git PR
