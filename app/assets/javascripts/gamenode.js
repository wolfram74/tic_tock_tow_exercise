function GameNode(state){
  this.state = state
  this.children = []
  this.tieWeight = {1: 1, 2:1}
  this.winWeight = {1:0, 2:0}
  this.loseWeight = {1:0, 2:0}
};

GameNode.prototype.outcomeCheck = function(){
  var outRow = this.checkRows()
  var outCol = this.checkCols()
  var outDia = this.checkDiags()
  return outRow || outCol || outDia
};

GameNode.prototype.checkCols = function(){
  var out = 0;
  for(var col=0; col<3; col++){
    var triplet = this.state[col]+this.state[col+3]+this.state[col+6]
    out = this.stringCheck(triplet)
    if (!!out){return parseInt(out)};
  };
  return out
};

GameNode.prototype.checkRows = function(){
  var out = 0;
  for(var row=0; row<3; row++){
    var triplet = this.state.substring(row*3,row*3+3)
    console.log(triplet, row)
    out = this.stringCheck(triplet)
    if (!!out){return out};
  };
  return out
};
GameNode.prototype.checkDiags = function(){
  var out = 0;
  var trips = [this.state[0]+this.state[4]+this.state[8],
               this.state[2]+this.state[4]+this.state[6]]
  for(var diag=0; diag<3; diag++){
    var triplet = trips[diag]
    out = this.stringCheck(triplet)
    if (!!out){return out};
  };
  return out
};

GameNode.prototype.stringCheck = function(string){
  var capture = /(\d)\1\1/;
  if (capture.test(string)){
    return parseInt(capture.exec(string)[1]);
  };
  return 0
}