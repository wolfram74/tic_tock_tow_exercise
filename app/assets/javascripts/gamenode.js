function GameNode(state, parent, tree){
  this.state = state
  this.parent = parent
  this.tree = tree
  this.tieWeight = {1: 0, 2:0}
  this.winWeight = {1:0, 2:0}
  this.loseWeight = {1:0, 2:0}
  this.children = []
  this.totalChildren = 0
  var outcome = this.outcomeCheck()
  if(outcome){
    this.tieWeight={1:0, 2:0}
    this.winWeight[outcome] = 1
    this.winWeight[outcome%2 +1] = 0
    this.loseWeight[outcome] = 0
    this.loseWeight[outcome%2 +1] = 1
  } else{
    this.populateChildren()
    this.totalChildren+=this.children.length
    if(this.children.length){
    this.reviewChildren()    
    } else{
      this.tieWeight = {1: 1, 2:1}
    }
  };
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
GameNode.prototype.populateChildren = function(){
  var count1 = (this.state.match(/(1)/g)||[]).length
  var count2 = (this.state.match(/(2)/g)||[]).length
  var insert = (count1-count2)%2 + 1
  var options = 9-(count1+count2)
  if (!!options){
    var capt = /0/g
    while((match = capt.exec(this.state))!= null){
      var childState = utilities.replaceAt(this.state, match.index, insert.toString())
      if (this.tree[childState]){
        this.children.push(this.tree[childState])
      } else{
        this.tree[childState] = new GameNode(childState, this, this.tree)
        this.children.push(this.tree[childState])
      };
    };
  };
}
GameNode.prototype.reviewChildren = function(){
  for(var childInd in this.children){
    var child = this.children[childInd]
    this.totalChildren += child.totalChildren
    this.tieWeight[1] += child.tieWeight[1]
    this.tieWeight[2] += child.tieWeight[2]
    this.winWeight[1] += child.winWeight[1]
    this.winWeight[2] += child.winWeight[2]
    this.loseWeight[1] += child.loseWeight[1]
    this.loseWeight[2] += child.loseWeight[2]
  };
  this.tieWeight[1] /= this.children.length
  this.tieWeight[2] /= this.children.length
  this.winWeight[1] /= this.children.length
  this.winWeight[2] /= this.children.length
  this.loseWeight[1] /= this.children.length
  this.loseWeight[2] /= this.children.length
}