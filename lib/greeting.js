'use strict';

var _ = require('lodash'),
    items = require('./constants').ONBOARDING_ITEMS,
    teamName = require('./constants').TEAM_NAME;

module.exports = greeting;

function greeting(slack, name) {
    var channel = slack.getChannelByName('general'),
        message = 'Welcome to ' + teamName + ', @' + name + '. Here are a few things you can start with:\n' +
            _.reduce(items, function(msg, item) {
                    return msg + '• ' + item.title + ': ' + item.link + '\n';
                },
                '');

    channel.send(message);
}

