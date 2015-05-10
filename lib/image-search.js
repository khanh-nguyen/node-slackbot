'use strict';

var request = require('request'),
    url = require('url'),
    rand = require('../utils/rand');

module.exports = imageSearch;

function imageSearch(searchTerm, cb) {
    var query = url.format({
        protocol: 'https',
        host: 'ajax.googleapis.com/ajax/services/search/images',
        query: {
            v: '1.0',
            q: searchTerm,
            imgsz: 'medium',
            rsz: 8
        }
    });
    request(query, function(err, response, body) {
        if (err) {
            return cb(err);
        }
        if (response.statusCode == 200) {
            var result = JSON.parse(body);

            if (result.responseData) {
                var n = result.responseData.results.length,
                    imageUrl = result.responseData.results[rand(n)].url;
                return cb(null, imageUrl);
            }

        }

        var error = new Error('Error search image');
        error.code = response.statusCode;
        return cb(error);
    });
}
