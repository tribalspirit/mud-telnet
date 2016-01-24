'use strict';
let net = require('net');
let Player = require('./app/server/players');


let newPlayer = function(socket){
	console.log("No, another one...");
	new Player(socket);
}

var server = net.createServer(newPlayer);

server.listen(8888);
console.log("Server started at 8888");
