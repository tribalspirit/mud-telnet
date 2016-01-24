'use strict';
let method = Character.prototype;

let races = ["Human", "Wookie", "Gungan", "T'weelek", "Droid", "Ewok"]
let firstNames = ["Han", "Luke", "Yoda" , "Leia", "Darth", "Lando", "Boba", "Asuka", "Padme", "Jar-Jar", "R2", "C3"];
let lastNames = ["Solo", "Skywalker", "Green", "Organa", "Maul", "Calrissian", "Fett", "Tana", "Amidala", "Binks", "D2", "PO"]

let getRandom = function(list) {
  // TODO to be replaced with _.sample
  return list[Math.floor(Math.random()*list.length)];
}

function Character(){
   this._firstName = getRandom(firstNames);
   console.log(this._firstName);
   this._lastName = getRandom(lastNames);
   console.log(this._lastName);
   this._race = getRandom(races);
   console.log(this._race);
}

method.getStat = function(){
  let res = this._firstName + " " + this._lastName;
  return res;
}


module.exports = Character;
