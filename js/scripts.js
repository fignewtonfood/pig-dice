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
    if (this.permScore >= 100) {
        if (this.playerId == 1) {
            if (confirm ("Player 1 wins... Play again?") == true) {
                location.reload(true);
            }
        } else {
            if (confirm ("Player 2 wins... Play again?") == true) {
                location.reload(true);
            }
        }
    } else {
        switchToPlayer();
        return this.permScore;
    }
}

// Player.prototype.checkForWin = function(){
//     if (this.permScore >= 100) {
//         return "You win!";
//     }
// }


// Player.prototype.switchPlayer = function(){
//     if (this.playerId == 3) {
//         $("#playerOneButtons").hide();
//     } else {
//         $("#playerOneButtons").show();
//     }
// }

// function switchToComputer(){
//     if (playerBit == 0) {
//         playerBit = 1;
//         // $("#playerOneButtons").hide();
//         // $("#playerTwoButtons").show();
//     } else {
//         playerBit = 0;
//         // $("#playerTwoButtons").hide();
//         // $("#playerOneButtons").show();
//     }
// }

function computerLogic(){
    if (playerType == 3) {
        while (playerTwo.tempScore<= 10) {
            playerTwo.rollAgain();
        }
        playerTwo.stopRolling();
    } else {
//hard computer
    }
}


function switchToPlayer(){
    if (playerType == 3) {
        if (playerBit == 0) {
            playerBit = 1;
            $("#playerOneButtons").hide();
            $("#playerTwoButtons").show();
            computerLogic();
        } else {
            playerBit = 0;
            $("#playerTwoButtons").hide();
            $("#playerOneButtons").show();
        }
    } else {
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
}

//Global variable required to determine whether player was human
var playerType;
var playerTwo;

//jQuery
$(document).ready(function(){
    var playerOne = new Player (1, permScore, tempScore);
    playerTwo = new Player (2, permScore, tempScore);
    // var playerNumber = [playerOne, playerTwo];

    $("button#two-player").click(function(event){
        event.preventDefault();
        $("#p1score").text(playerOne.permScore);
        $("#p2score").text(playerTwo.permScore);
        $("#roll").text(rollResult);
    });

    $("button#easy-comp").click(function(event){
        event.preventDefault();
        playerTwo.playerId = 3;
        playerType = playerTwo.playerId;
        $("#p1score").text(playerOne.permScore);
        $("#p2score").text(playerTwo.permScore);
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
        $('#tempScore').text(playerOne.tempScore)
        $('#p1score').text(playerOne.permScore)
        $('#p2score').text(playerTwo.permScore)
        $("#roll").text(rollResult);
        //roll, add rollResult to tempScore,
    });

//button p1 pass
    $("button#p1pass").click(function(event){
        playerOne.stopRolling();
        $('#tempScore').text(playerOne.tempScore)
        $('#p1score').text(playerOne.permScore)
        $('#p2score').text(playerTwo.permScore)
        $("#roll").text(rollResult);
    });

    $("button#p2hit").click(function(event){
        playerTwo.rollAgain();
        $("#roll").text(rollResult);
        $('#tempScore').text(playerTwo.tempScore)
        $('#p2score').text(playerTwo.permScore)
    });

    $("button#p2pass").click(function(event){
        playerTwo.stopRolling();
        $('#tempScore').text(playerTwo.tempScore)
        $('#p2score').text(playerTwo.permScore)
    });
});
