'use strict';

var request = require('request'),
    url = require('url');

module.exports = imageSearch;

function imageSearch(searchTerm, cb) {
    var query = url.format({
        protocol: 'https',
        host: 'ajax.googleapis.com/ajax/services/search/images',
        query: {
            v: '1.0',
            q: searchTerm
        }
    });
    request(query, function(err, response, body) {
        if (err) {
            return cb(err);
        }
        if (response.statusCode == 200) {
            var result = JSON.parse(body),
                imageUrl = result.responseData.results[0].url;
            return cb(null, imageUrl);
        }

        var error = new Error('Error search image');
        error.code = response.statusCode;
        return cb(error);
    });
};

