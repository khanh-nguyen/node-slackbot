'use strict';

module.exports = {
    BOT_NAME: 'slackbot',           // replace with your slackbot name
    CRON_TIME: '00 43 12 * * 1-5',  // replace with your cron rule
    CRON_MESSAGE: 'A message to be sent everytime cron job executes',
    TEAM_NAME: 'NDK',
    ONBOARDING_ITEMS: [
        {
            title: 'Slack guide',
            link: 'https://slack.zendesk.com/hc/en-us/articles/202288908-Formatting-your-messages'
        },
        {
            title: 'Github guide',
            link: 'https://guides.github.com/'
        },
        {
            title: 'Github markdown',
            link: 'https://help.github.com/articles/github-flavored-markdown/'
        }
    ]
};
