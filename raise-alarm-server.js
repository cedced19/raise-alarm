#!/usr/bin/env node
'use strict';
var app = require('express')(),
    serveStatic = require('serve-static'),
    chalk = require('chalk');

app.use(serveStatic(__dirname));

var server = require('http').createServer(app);


server.listen(7774, function() {
    console.log('Server running at\n => '+ chalk.green('http://localhost:' + 7774) + '\nCTRL + C to shutdown');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    socket.on('send', function () {
        socket.broadcast.emit('alert');
    });
});
