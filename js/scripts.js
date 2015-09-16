//dice roller
function roll() {
  return Math.floor(Math.random() * (6)) + 1;
};

var tempScore = 0;

function addToTempScore() {
  var rollResult = roll();
  tempScore += rollResult;
};
