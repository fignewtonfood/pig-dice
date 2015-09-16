var tempScore = 0;
var permScore = 0;
var rollResult = 0;

//dice roller
function roll() {
  rollResult = Math.floor(Math.random() * (6)) + 1;
  return rollResult;
}

function Player(permScore, tempScore){
  tempScore = 0;
  permScore = 0;
  this.permScore = permScore;
  this.tempScore = tempScore;
}

Player.prototype.rollAgain = function() {
  this.tempScore += rollResult;
  return this.tempScore;
}

Player.prototype.stopRolling = function(){
  this.permScore += this.tempScore;
  return this.permScore;
}

Player.prototype.checkForOne = function(){
  if (rollResult == 1) {
    this.tempScore = 0;
    this.stopRolling();
  }
}


// function resetScore() {
//     $("input.new-street").last().val("");
//     $("input.new-city").last().val("");
// }
