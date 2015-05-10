# node-slackbot

A simple Slack bot written in NodeJS.

## How to use it
* In Slack, add a bot integrations. Copy the generated token.
* Set constants in `constants.js`
* Deploy to your app server, e.g. Heroku
* Set credential information on the server:
  * Heroku token
  * GOOGLE_API key
  * CONF_LINK (if you need it) 

## What this bot does
* It sends out messsage on `#general` channel at time defined by your cron rule.
* It searches for images if you ask it nicely: `slackbot image me useful bot`
* It searches for youtube video too: `slackbot youtube me super bot`
* It sends out message to welcome new teamates.

