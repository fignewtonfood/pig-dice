var tempScore = 0;
var permScore = 0;
var rollResult = 0;
var playerBit = 0;

//dice roller
function roll() {
  rollResult = Math.floor(Math.random() * (6)) + 1;
  return rollResult;
}

function Player(playerId, permScore, tempScore){
  tempScore = 0;
  permScore = 0;
  this.playerId = playerId;
  this.permScore = permScore;
  this.tempScore = tempScore;
}

Player.prototype.rollAgain = function() {
  this.tempScore += rollResult;
  return this.tempScore;
}

Player.prototype.stopRolling = function(){
  this.permScore += this.tempScore;
  switchPlayer();
  return this.permScore;
}

Player.prototype.checkForOne = function(){
  if (rollResult == 1) {
    this.tempScore = 0;
    this.stopRolling();
  }
}

Player.prototype.checkForWin = function(){
  if (this.permScore >= 100) {
    return "You win!";
  }
}

function switchPlayer(){
    if (currentP == 0) {
        playerBit = 1;
    } else {
        playerBit = 0;
    }
}


//jQuery
$(document).ready(function(){
    var playerOne = new Player (1, permScore, tempScore);
    var playerTwo = new Player (2, permScore, tempScore);
    var playerType = playerTwo.playerId;
    $("button#two-player").click(function(event){
        event.preventDefault();
        $("#p1score").text(playerOne.permScore);
        $("#p2score").text(playerTwo.permScore);
        //print temp score of current player
        //$("#tempScore").text(this.tempScore)
        $("#roll").text(rollResult);
    });

    $("button.playerselection").click(function(){
        $("#game").show();
    });
});
