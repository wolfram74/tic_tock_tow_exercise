var startTime = Date.now()
var gameTree = new GameTree()
describe("gameTree object", function(){
  it("comprised of game node objecs", function(){    
    expect(gameTree["000000000"].constructor.name ).toBe("GameNode");
  });
});

describe("gameNode object", function(){
  it("has children gameNodes", function(){    
    expect(gameTree["000000000"].children[0].constructor.name ).toBe("GameNode");
    expect(gameTree["000000000"].children.length ).toBe(9);
  });
  
  it("can check victory", function(){    
    var win1 = new GameNode("120120100")
    var win2 = new GameNode("112120200")
    var tie = new GameNode("121221112")
    expect(win1.outcomeCheck() ).toBe(1);
    expect(win2.outcomeCheck() ).toBe(2);
    expect(tie.outcomeCheck() ).toBe(0);
  });  

  it("has total number of children", function(){    
    expect(gameTree["120120100"].totalChildren ).toBe(0);
    expect(gameTree["121212012"].totalChildren ).toBe(1);
    expect(gameTree["121212010"].totalChildren ).toBe(4);
  });
  it("has outcome weights", function(){
    expect(gameTree["121212010"].winWeight[1] ).toBe(1);
    expect(gameTree["121212010"].winWeight[2] ).toBe(0);
    expect(gameTree["121221100"].winWeight[2] ).toBe(.5);
    expect(gameTree["121221100"].tieWeight[1] ).toBe(.5);
    expect(gameTree["121221100"].loseWeight[1]).toBe(.5);
    expect(gameTree["121221112"].tieWeight[1] ).toBe(1);
    expect(gameTree["121221112"].tieWeight[2] ).toBe(1);
  })
  it("Outcome weights are zero sum", function(){
    var root = gameTree["000000000"]
    expect(root.winWeight[1]).toBe(root.loseWeight[2])
    expect(root.winWeight[2]).toBe(root.loseWeight[1])
    var num1 = Math.floor(root.tieWeight[1]*1000000)
    var num2 = Math.floor((1-(root.loseWeight[2]+root.winWeight[2]))*1000000)
    expect(num1).toBe(num2)
  });
});

var endTime = Date.now()
console.log(endTime-startTime )