var tempScore = 0;
var permScore = 0;
var rollResult = 0;
var playerBit = 0;
var playerMove = 0;
var printMove;

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
        playerMove = 3;
        printOutput();
    } else {
        this.tempScore += rollResult;
        playerMove = 1;
        printOutput();
        return this.tempScore;
    }
}

Player.prototype.stopRolling = function(){
    this.permScore += this.tempScore;
    playerMove = 2;
    printOutput();
    this.tempScore = 0;
    if (this.permScore >= 100) {
        if (this.playerId == 1) {
            $("#playerOneWins").show();
        } else {
            $("#playerTwoWins").show();
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

function printOutput(){
    if (playerType >= 3) {
        if (playerMove == 1) {
            printMove = "rolled again and rolled a " + rollResult + ".";
        } else if (playerMove == 2) {
            printMove = "decided to pass and earned " + playerTwo.tempScore + " points!";
        } else if (playerMove == 3) {
            printMove = "rolled a one and now it's your turn!";
        }
        $("#moves").show();
        showOutput();
    }
}

function showOutput(){
    $("ul#move-list").append("<li class='list-item'>Player " + printMove + "</li>");
}


function computerLogic(){
    if (playerType == 3) {
        while ((playerTwo.tempScore<= 10) && playerBit == 1) {
            playerTwo.rollAgain();
        }
        if (playerBit == 1) {
            playerTwo.stopRolling();
        }
    } else {
        if (playerTwo.permScore == 0 ) {
            while ((playerTwo.tempScore < 21) && playerBit == 1) {
                playerTwo.rollAgain();
            }
            if (playerBit == 1) {
                playerTwo.stopRolling();
            }
        } else if (playerTwo.permScore - playerOne.permScore > 40){
            while ((playerTwo.tempScore < 10) && playerBit == 1) {
                playerTwo.rollAgain();
            }
            if (playerBit == 1) {
                playerTwo.stopRolling();
            }
        } else if (playerTwo.permScore - playerOne.permScore > 20){
            while ((playerTwo.tempScore < 15) && playerBit == 1) {
                playerTwo.rollAgain();
            }
            if (playerBit == 1) {
                playerTwo.stopRolling();
            }
        } else if (playerTwo.permScore - playerOne.permScore > 0){
            while ((playerTwo.tempScore < 21) && playerBit == 1) {
                playerTwo.rollAgain();
            }
            if (playerBit == 1) {
                playerTwo.stopRolling();
            }
        } else if (playerTwo.permScore - playerOne.permScore > -20){
            while ((playerTwo.tempScore < 25) && playerBit == 1) {
                playerTwo.rollAgain();
            }
            if (playerBit == 1) {
                playerTwo.stopRolling();
            }
        } else if (playerTwo.permScore - playerOne.permScore > -40){
            while ((playerTwo.tempScore < 30) && playerBit == 1) {
                playerTwo.rollAgain();
            }
            if (playerBit == 1) {
                playerTwo.stopRolling();
            }
        }
    }
}


function switchToPlayer(){
    if (playerType >= 3) {
        if (playerBit == 0) {
            playerBit = 1;
            $("#playerOneButtons").hide();
            $("#playerTwoButtons").show();
            $(".list-item").remove();
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


// function



//Global variable required to determine whether player was human
var playerType;
var playerTwo;
var playerOne;

//jQuery
$(document).ready(function(){
    playerOne = new Player (1, permScore, tempScore);
    playerTwo = new Player (2, permScore, tempScore);
    // var playerNumber = [playerOne, playerTwo];

    $("button#two-player").click(function(event){
        event.preventDefault();
        $("#p1score").text(playerOne.permScore);
        $("#p2score").text(playerTwo.permScore);
        $("#roll").text(rollResult);
        $("#gameSelect").hide();
    });

    $("button#easy-comp").click(function(event){
        event.preventDefault();
        playerTwo.playerId = 3;
        playerType = playerTwo.playerId;
        $("#p1score").text(playerOne.permScore);
        $("#p2score").text(playerTwo.permScore);
        $("#roll").text(rollResult);
        $("#gameSelect").hide();
    });

    $("button#hard-comp").click(function(event){
        event.preventDefault();
        playerTwo.playerId = 4;
        playerType = playerTwo.playerId;
        $("#p1score").text(playerOne.permScore);
        $("#p2score").text(playerTwo.permScore);
        $("#roll").text(rollResult);
        $("#gameSelect").hide();
    });

    $("button#play-again").click(function(event){
        event.preventDefault();
        location.reload();
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
        $(".list-item").remove();
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
