function GameAI(game, winnable){
  this.game = game
  this.winnable = !!winnable
};

GameAI.prototype.pickState = function(){
  var currentNode = gameTree[this.game.state]
  var loseChance = 1
  var movesLeft = (this.game.state.match(/(0)/g)||[]).length
  var player = (9-movesLeft)%2 + 1
  var safeState
  for(var index in currentNode.children){
    var candidate = currentNode.children[index]
    if(candidate.loseWeight[player]<loseChance){
      loseChance = candidate.loseWeight[player]
      safeState = candidate.state
    };
  };
  return safeState;
};

GameAI.prototype.makeMove = function(){
  var target = this.pickState()
  var jams
};
