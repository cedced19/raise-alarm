#!/usr/bin/env node
'use strict';
var hapi = require('hapi'),
    app = new hapi.Server(),
    program = require('commander'),
    colors = require('colors'),
    port = 7774,
    pkg = require('./package.json');

program
    .version(pkg.version)
    .option('-p, --port [number]', 'specified the port')
    .parse(process.argv);

if (!isNaN(parseFloat(program.port)) && isFinite(program.port)){
    port = program.port;
}

app.connection({ port: port }); 

app.route({
    method: 'GET',
    path: '/vendor/{param*}',
    handler: {
        directory: {
            path: './vendor/'
        }
    }
});

app.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file('index.html');
    }
});


app.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: function (request, reply) {
        reply.file('favicon.ico');
    }
});

app.start(function () {
    console.log('Server running at\n => '+ colors.green('http://localhost:' + port) + '\nCTRL + C to shutdown');
    require('check-update')({packageName: pkg.name, packageVersion: pkg.version, isCLI: true}, function(err, latestVersion, defaultMessage){
        if(!err){
            console.log(defaultMessage);
        }
    });
});

var io = require('socket.io').listen(app.listener);

io.sockets.on('connection', function(socket){
    socket.on('send', function () {
        socket.broadcast.emit('alert');
    });
});
