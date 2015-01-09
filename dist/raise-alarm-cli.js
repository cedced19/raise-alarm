#!/usr/bin/env node
'use strict';
var app = require('express')(),
    serveStatic = require('serve-static'),
    program = require('commander'),
    opn = require('opn'),
    colors = require('colors'),
    port = 7774,
    pkg = require('./package.json');

program
    .version(pkg.version)
    .option('-p, --port [number]', 'specified the port')
    .parse(process.argv);


app.use(serveStatic(__dirname));

var server = require('http').createServer(app);


if (!isNaN(parseFloat(program.port)) && isFinite(program.port)){
    port = program.port;
}
server.listen(port, function() {
    console.log('Server running at\n => '+ colors.green('http://localhost:' + port) + '\nCTRL + C to shutdown');
    require('check-update')({packageName: pkg.name, packageVersion: pkg.version, isCLI: true}, function(err, latestVersion, defaultMessage){
        if(!err){
            console.log(defaultMessage);
        }
    });
    opn('http://localhost:' + port);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    socket.on('send', function () {
        socket.broadcast.emit('alert');
    });
});
