'use strict';

var Slack = require('slack-client'),
    bunyan = require('bunyan'),
    log = bunyan.createLogger({name: 'slackbot'}),

    // constants
    constants = require('./constants'),
    CRON_MESSAGE = constants.CRON_MESSAGE,
    CRON_TIME = constants.CRON_TIME,

    // credential info
    TOKEN = process.env.SLACK_TOKEN,
    CONF_LINK = process.env.CONF_LINK,

    // create slack client and cron job
    slack = new Slack(TOKEN, true, true),
    CronJob = require('cron').CronJob,
    job = new CronJob({
      cronTime: CRON_TIME,
      onTick: function() {
         var channel = slack.getChannelByName('random'),
             cronMessage = CRON_MESSAGE + '\n' + CONF_LINK;

         channel.send(cronMessage);
      },
      start: false,
      timeZone: "America/New_York"
    });
    
slack.on('open', function() {
    job.start(); 
});

slack.on('error', function(error) {
    log.error({error: error}, 'slackbot experienced some error.');
});

slack.login();
