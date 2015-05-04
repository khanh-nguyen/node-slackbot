var constants = require('./constants'),
    CRON_MESSAGE = constants.CRON_MESSAGE,
    CRON_TIME = constants.CRON_TIME,
    CONF_LINK = process.env.CONF_LINK,
    CronJob = require('cron').CronJob;

module.exports = cronJob;

function cronJob() {
    return new CronJob({
        cronTime: CRON_TIME,
        onTick: function() {
            var channel = slack.getChannelByName('general'),
                cronMessage = CRON_MESSAGE + '\n' + CONF_LINK;

            channel.send(cronMessage);
        },
        start: false,
        timeZone: "America/New_York"
    });
}

