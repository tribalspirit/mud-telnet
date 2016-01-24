'use strict';
let players = [];
var _ = require('lodash-node');

let crypto = require('crypto');
let method = Player.prototype;

method.receiveData = function(data) {
	var cleanData = cleanInput(data);
	if(cleanData === "@quit") {
		this.socket.end('Goodbye!\n');
	}
	else {

	}
}

/*
 * Method executed when a socket ends
 */
method.closePlayer = function() {
	var i = _.indexOf(players, this);
	if (i != -1) {
		players.splice(i, 1);
	}
}

method.answer = function(str) {
	this.socket.write(str + '\r\n>>');
}

method.sendTo = function(id, str) {
  let recepient = _.find(players, {'id': id});
  let msg = ''.concat('\r\nMessage from: ')
              .concat(this.id)
              .concat('\r\n-')
              .concat(str)
              .concat('\r\n>>')
  recepient.socket.write(msg);
}

method.sendToAll = function(str) {
  let msg = ''.concat('\r\nMessage from: ')
              .concat(this.id)
              .concat('\r\n-')
              .concat(str)
              .concat('\r\n>>')
  _.forEach(players, (player) => {
    if(player !== this) {
      player.socket.write(msg);
    }
  })
}

function cleanInput(data) {
	return data.toString().replace(/(\r\n|\n|\r)/gm,"");
}

function Player(socket) {
  this.socket = socket;
  this.id = crypto.randomBytes(20).toString('hex');
	players.push(this);

  this.answer(this.id);
  this.sendToAll(this.id);

	this.socket.on('data', (data) =>  {
		this.receiveData(data);
	});

	this.socket.on('end', () => {
		this.closePlayer();
	});
}

module.exports = Player;
module.exports.Players = players;
