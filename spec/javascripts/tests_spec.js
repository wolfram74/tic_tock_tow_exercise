describe("gameTree object", function(){
  it("comprised of game node objecs", function(){    
    expect(typeof gameTree["000000000"] ).toBe("gameNode");
  });
});

describe("gameNode object", function(){
  it("has children gameNode", function(){    
    expect(typeof gameTree["000000000"].children[0] ).toBe("gameNode");
    expect(typeof gameTree["000000000"].children.length ).toBe(9);
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

  })
});

