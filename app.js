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
for(var i = 0; i < 10; i++){
    (function(){
        paths = [];
        var nsp = io.of('/'+i);
        nsp.on('connection', function(socket){
            socket.on('chat message', function(msg){
                console.log(msg);
                nsp.emit('chat message',msg);
            });

            socket.on('path', function(msg){
                paths.push(msg);
                socket.broadcast.emit('path', msg);
            });
        });
    })()
}

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
server.listen(appEnv.port, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
