#!/usr/bin/env node
'use strict';
var app = require('express')(),
    serveStatic = require('serve-static'),
    program = require('commander'),
    chalk = require('chalk');

program
    .version(require('./package.json').version)
    .option('-p, --port [number]', 'specified the port')
    .parse(process.argv);


app.use(serveStatic(__dirname));

var server = require('http').createServer(app);


if (!isNaN(parseFloat(program.port)) && isFinite(program.port)){
    var port = program.port;
    }else{
    var port = 7774;
    }
    server.listen(port, function() {
    console.log('Server running at\n => '+ chalk.green('http://localhost:' + port) + '\nCTRL + C to shutdown');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    socket.on('send', function () {
        socket.broadcast.emit('alert');
    });
});
