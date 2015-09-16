describe('dice roller', function() {
    it('generate a random number and store it to a variable', function() {
      expect(Number.isInteger(roll())).to.equal(true);
    });
});

describe('add to tempScore', function() {
    it('test if tempScore is an integer', function() {
      expect(Number.isInteger(tempScore)).to.equal(true);
    });
    it('adds output of roll to tempScore var', function() {
      addToTempScore();
      expect(tempScore >= roll()).to.equal(true);
    });

});
