/**
 * Created by Alex on 10/1/2016.
 */

var express = require('express');
var fs = require('fs');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server);
var counter = 0;
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        counter++;
        console.log('message: ' + msg);
        io.emit('chat message', counter+': '+msg);
    });
    fs.readFile('./public/images/blue quad.jpg', function(err, buf){
        socket.emit('image', { image: true, buffer: buf.toString('base64') });
    });
    socket.on('img upload', function(buf){
        io.emit('image', { image: true, buffer: buf.toString('base64') });
    });
});

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
server.listen(appEnv.port, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
