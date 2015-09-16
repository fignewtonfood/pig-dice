describe('dice roller', function() {
    it('generate a random number and store it to a variable', function() {
      expect(Number.isInteger(roll())).to.equal(true);
    });
});

describe('add to tempScore', function() {
    it('test if tempScore is an integer', function() {
      var testPlayer = new Player(permScore, tempScore)
      expect(Number.isInteger(testPlayer.tempScore)).to.equal(true);
    });

    it('adds output of roll to tempScore var', function() {
      var testPlayer = new Player(permScore, tempScore)
      testPlayer.rollAgain();
      expect(testPlayer.tempScore >= 0).to.equal(true);
    });

});

describe('add tempScore to permScore', function(){
  it('test if permScore is an integer', function(){
    var testPlayer = new Player(permScore, tempScore)
    expect(Number.isInteger(testPlayer.permScore)).to.equal(true);
  });

  it('add tempScore to permScore', function(){
    var testPlayer = new Player(permScore, tempScore)
    testPlayer.stopRolling();
    expect(testPlayer.permScore >= testPlayer.tempScore).to.equal(true);
  });
});

describe('Player', function() {
    it('creates a new player', function() {
      var testPlayer = new Player(permScore, tempScore)
      expect(testPlayer.permScore).to.equal(0);
      expect(testPlayer.tempScore).to.equal(0);
    });
});

describe('check for 1', function() {
    it('stops rolling if 1 is rolled', function() {
      var testPlayer = new Player(permScore, tempScore)
      rollResult = 1;
      testPlayer.checkForOne();
      expect(testPlayer.tempScore).to.equal(0);
    });
});
