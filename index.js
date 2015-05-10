'use strict';

var Slack = require('slack-client'),
    bunyan = require('bunyan'),
    log = bunyan.createLogger({name: 'slackbot'}),
    imageSearch = require('./lib/image-search'),
    youtubeSearch = require('./lib/youtube-search'),
    greeting = require('./lib/greeting'),

    // constants
    constants = require('./lib/constants'),
    BOT_NAME = constants.BOT_NAME,

    // credential info
    TOKEN = process.env.SLACK_TOKEN,

    // create slack client and cron job
    slack = new Slack(TOKEN, true, true),
    cronJob = require('./lib/cron-job')(slack);
    
slack.on('open', function() {
    cronJob.start();
});

slack.on('error', function(error) {
    log.error({error: error}, BOT_NAME + ' experienced some error.');
});

slack.on('message', function(message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel),
        user = slack.getUserByID(message.user);
    if (!user) {
        return;
    }

    var msg = message.text,
        IMG_MSG_REGEX = new RegExp('^' + BOT_NAME + '( image| img| animate)( me)? (.*)'),
        YT_MSG_REGEX = new RegExp('^' + BOT_NAME + '( youtube| yt)( me)? (.*)'),
        imgMatch = msg.match(IMG_MSG_REGEX),
        ytMatch = msg.match(YT_MSG_REGEX);

    if (imgMatch && imgMatch[3]) {
        return imageSearch(imgMatch[3], function(err, img) {
            if (!err) {
                log.info({image: img}, BOT_NAME + ' sends image');
                channel.send(img);
            }
        });
    }

    if (ytMatch && ytMatch[3]) {
        return youtubeSearch(ytMatch[3], function(err, video) {
            if (!err) {
                log.info({video: video}, BOT_NAME + ' sends video.');
                channel.send(video);
            }
        });
    }
});

slack.on('userChange', function(user) {
    if (!user.deleted) {
        return greeting(slack, user.name)
    }
});

slack.login();
