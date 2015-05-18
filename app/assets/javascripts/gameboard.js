function GameBoard(){
  this.state = "000000000";
  this.history = [this.state]
  this.player = 1;
};

GameBoard.prototype.play = function(index){
  this.state = utilities.replaceAt(this.state, index, this.player.toString())
  this.player = (this.player%2)+1
  this.history.push(this.state)
};
