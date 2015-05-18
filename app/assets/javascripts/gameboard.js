function GameBoard(){
  this.state = "000000000";
  this.player = 1;
};

GameBoard.prototype.play = function(index){
  this.state = utilities.replaceAt(this.state, index, this.player)
  this.player = (this.player%2)+1
};
