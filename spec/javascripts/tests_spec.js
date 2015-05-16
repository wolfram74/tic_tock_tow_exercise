var gameTree = {"000000000": "string"} 
describe("gameTree object", function(){
  it("comprised of game node objecs", function(){    
    expect(typeof gameTree["000000000"] ).toBe("GameNode");
  });
});

describe("gameNode object", function(){
  it("has children gameNodes", function(){    
    expect(typeof gameTree["000000000"].children[0] ).toBe("gameNode");
    expect(typeof gameTree["000000000"].children.length ).toBe(9);
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
    expect(typeof gameTree["120120100"].totalChildren ).toBe(0);
    expect(typeof gameTree["121212012"].totalChildren ).toBe(1);
    expect(typeof gameTree["121212010"].totalChildren ).toBe(4);
  });
  it("has outcome weights", function(){
    expect(typeof gameTree["121212010"].winWeight(1) ).toBe(1);
    expect(typeof gameTree["121212010"].winWeight(2) ).toBe(0);
    expect(typeof gameTree["121221100"].winWeight(2) ).toBe(.5);
    expect(typeof gameTree["121221100"].tieWeight(1) ).toBe(.5);
    expect(typeof gameTree["121221100"].loseWeight(1) ).toBe(.5);
    expect(typeof gameTree["121221112"].tieWeight(1) ).toBe(1);
    expect(typeof gameTree["121221112"].tieWeight(2) ).toBe(1);

  })
});

