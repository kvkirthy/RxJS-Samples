'use strict';

var _ = require('underscore');
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

function readApiData() {
    return require('./data.json');
}

function search(term, data) {
    return _.filter(data, function (record) {
        return _.reduce(record, function (found, value) {
            var re = new RegExp("\\b" + term + "\\b", "i");
            return found || !!re.exec(value);
        }, false);
    });
}

app.get('/api/search', function(req, res){
    res.json(search(req.query.term, readApiData()));
});

app.get('/index.html', function(req, res) {
    var index = fs.readFileSync('index.html', 'utf8');
    res.send(200, index);
});

app.use('/bower_components', express.static('bower_components'));

app.listen(3001, function(){
   console.log('node express server started'); 
});