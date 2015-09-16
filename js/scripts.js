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
    roll();
    if (rollResult == 1) {
        this.tempScore=0;
        this.stopRolling();
    } else {
        this.tempScore += rollResult;
        return this.tempScore;
    }
}

Player.prototype.stopRolling = function(){
    this.permScore += this.tempScore;
    this.tempScore = 0;
    switchPlayer();
    return this.permScore;
    // if (playerBit == 0) {
    //     playerOne.permScore += playerOne.tempScore;
    //     playerOne.tempScore = 0;
    //     switchPlayer();
    //     return playerOne.permScore;
    // } else {
    //     playerTwo.permScore += playerTwo.tempScore;
    //     playerTwo.tempScore = 0;
    //     switchPlayer();
    //     return playerTwo.permScore;
    // }
}

// Player.prototype.checkForOne = function(){
//     if (rollResult == 1) {
//         if (playerBit == 0) {
//             playerOne.tempScore = 0;
//             playerOne.stopRolling();
//         } else {
//             playerTwo.tempScore = 0;
//             playerTwo.stopRolling();
//         }
//     }
// }

Player.prototype.checkForWin = function(){
    if (this.permScore >= 100) {
        return "You win!";
    }
}

function switchPlayer(){
    if (playerBit == 0) {
        playerBit = 1;
        $("#playerOneButtons").hide();
        $("#playerTwoButtons").show();
    } else {
        playerBit = 0;
        $("#playerTwoButtons").hide();
        $("#playerOneButtons").show();
    }
}


//jQuery
$(document).ready(function(){
    var playerOne = new Player (1, permScore, tempScore);
    var playerTwo = new Player (2, permScore, tempScore);
    var playerNumber = [playerOne, playerTwo];
    var playerType = playerTwo.playerId;
    $("button#two-player").click(function(event){
        event.preventDefault();
        $("#p1score").text(playerOne.permScore);
        $("#p2score").text(playerTwo.permScore);
        //print temp score of current player
        //$("#tempScore").text(this.tempScore)
        $("#roll").text(rollResult);
    });
//button to show playfield
    $("button.playerselection").click(function(){
        $("#game").show();
    });
//button p1hit

    $("button#p1hit").click(function(event){
        playerOne.rollAgain();
        // playerOne.checkForOne();
        $("#roll").text(rollResult);
        $('#tempScore').text(playerOne.tempScore)
        //roll, add rollResult to tempScore,
    });
//button p1 pass
    $("button#p1pass").click(function(event){
        playerOne.stopRolling();
        $('#tempScore').text(playerOne.tempScore)
        $('#p1score').text(playerOne.permScore)
        // $("#playerOneButtons").hide();
        // $("#playerTwoButtons").show();
        //add tempScore to player score, switch players
    });

    $("button#p2hit").click(function(event){
        playerTwo.rollAgain();
        $("#roll").text(rollResult);
        $('#tempScore').text(playerTwo.tempScore)
    });

    $("button#p2pass").click(function(event){
        playerTwo.stopRolling();
        $('#tempScore').text(playerTwo.tempScore)
        $('#p2score').text(playerTwo.permScore)
        // $("#playerTwoButtons").hide();
        // $("#playerOneButtons").show();
    });
});
