'use strict';

var request = require('request'),
    url = require('url'),
    rand = require('../utils/rand'),
    API_KEY = process.env.GOOGLE_API;

module.exports = youtubeSearch;

function youtubeSearch(searchTerm, cb) {
    var query = url.format({
        protocol: 'https',
        host: 'www.googleapis.com/youtube/v3/search',
        query: {
            q: searchTerm,
            order: 'relevance',
            type: 'video',
            part: 'snippet',
            maxResults: 20,
            safeSearch: 'strict',
            key: API_KEY
        }
    });
    request(query, function(err, response, body) {
        if (err) {
            return cb(err);
        }
        if (response.statusCode == 200) {
            var result = JSON.parse(body);

            if (result.items) {
                var n = result.items.length,
                    videoId = result.items[rand(n)].id.videoId,
                    videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
                return cb(null, videoUrl);
            }
        }

        var error = new Error('Error search image');
        error.code = response.statusCode;
        return cb(error);
    });
}

