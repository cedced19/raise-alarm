#!/usr/bin/env node
'use strict';
var app = require('express')(),
    serveStatic = require('serve-static'),
    colors = require('colors'),
    pkg = require('./package.json');

app.use(serveStatic(__dirname));

var server = require('http').createServer(app);


server.listen(7774, function() {
    console.log('Server running at\n => '+ colors.green('http://localhost:7774') + '\nCTRL + C to shutdown');
    require('check-update')({packageName: pkg.name, packageVersion: pkg.version, isCLI: true}, function(err, latestVersion, defaultMessage){
        if(!err){
            console.log(defaultMessage);
        }
    });
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    socket.on('send', function () {
        socket.broadcast.emit('alert');
    });
});
