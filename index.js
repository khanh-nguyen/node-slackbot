'use strict';

var Slack = require('slack-client'),
    bunyan = require('bunyan'),
    log = bunyan.createLogger({name: 'slackbot'}),
    imageSearch = require('./lib/image-search'),

    // constants
    constants = require('./lib/constants'),
    BOT_NAME = constants.BOT_NAME,
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
         var channel = slack.getChannelByName('general'),
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

slack.on('message', function(message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel),
        user = slack.getUserByID(message.user);
    if (!user) {
        return;
    }

    var msg = message.text,
        IMG_MSG_REGEX = new RegExp('^' + BOT_NAME + '( image| img| animate)( me)? (.*)'),
        imgMatch = msg.match(IMG_MSG_REGEX);

    if (imgMatch && imgMatch[3]) {
        imageSearch(imgMatch[3], function(err, img) {
            if (!err) {
                log.info({image: img}, 'csrbot send image');
                channel.send(img);
            }
        });
    }
});

slack.login();
