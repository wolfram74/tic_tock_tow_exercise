function GameBoard(){
  this.state = "000000000";
  this.history = [this.state]
  this.player = 1;
};

GameBoard.prototype.nextPlayer = function(){
  this.player = (this.player%2)+1  
}

GameBoard.prototype.play = function(index){
  this.state = utilities.replaceAt(this.state, index, this.player.toString())
  this.nextPlayer()
  this.history.push(this.state)
};

GameBoard.prototype.undo = function(){
  this.history.pop()
  this.state = this.history[this.history.length -1]
  this.nextPlayer()
};

GameBoard.prototype.outcome = function(){
  var gameNode = gameTree[this.state]
  if (!!gameNode.children.length){
    return -1
  } else{
    return gameNode.outcomeCheck()
  };

};