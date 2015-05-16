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
  var capture = /(\d)\1\1/;
  for(var col=0; col<3; col++){
    var triplet = this.state[col]+this.state[col+3]+this.state[col+6]
    if (capture.test(triplet)){
      out = capture.exec(triplet)[1];
      if (!!out){return parseInt(out)};
    };
  };
  return parseInt(out)
};

GameNode.prototype.checkRows = function(){
  var out = 0;
  var capture = /(\d)\1\1/;
  for(var row=0; row<3; row++){
    var triplet = this.state[row*3]+this.state[row*3+1]+this.state[row*3+2]
    if (capture.test(triplet)){
      out = capture.exec(triplet)[1];
      if (!!out){return parseInt(out)};
    };
  };
  return parseInt(out)
}
GameNode.prototype.checkDiags = function(){
  var out = 0;
  var capture = /(\d)\1\1/;
  var trips = [this.state[0]+this.state[4]+this.state[8],
               this.state[2]+this.state[4]+this.state[6]]
  for(var diag=0; diag<3; diag++){
    var triplet = trips[diag]
    if (capture.test(triplet)){
      out = capture.exec(triplet)[1];
      if (!!out){return parseInt(out)};
    };
  };
  return parseInt(out)
}