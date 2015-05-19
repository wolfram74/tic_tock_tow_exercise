var startTime = Date.now()
var gameTree = new GameTree()
describe("utilities module", function(){
  it("#replaceAt", function(){    
    var test ="fart"
    expect(utilities.replaceAt(test, 2, "s")).toBe("fast");
    expect(utilities.replaceAt(test, 0, "d")).toBe("dart");
  });
})

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

describe("GameBoard object", function(){
  it("new boards report a blank state", function(){
    var testBoard = new GameBoard()
    expect(testBoard.state).toBe("000000000");
  });
  it("board can have it's state changed and remembered", function(){
    var testBoard = new GameBoard()
    testBoard.play(2)
    expect(testBoard.state).toBe("001000000");
    expect(testBoard.history.length).toBe(2);
    expect(testBoard.history[0]).toBe("000000000");
  });
  it("board can be undone by one step", function(){
    var testBoard = new GameBoard()
    testBoard.play(2)
    testBoard.play(3)
    expect(testBoard.state).toBe("001200000");
    testBoard.undo()
    expect(testBoard.state).toBe("001000000");
  });
  it("board can distinguish various end game states", function(){
    var player0 = new GameBoard()
    var player1 = new GameBoard()
    var player2 = new GameBoard()
    var unfinished = new GameBoard()
    player0.play(0)
    player0.play(1)
    player0.play(2)
    player0.play(3)
    player0.play(6)
    player0.play(4)
    player0.play(5)
    player0.play(8)
    player0.play(7)
    expect(player0.outcome()).toBe(0);
    player1.play(0)
    player1.play(1)
    player1.play(3)
    player1.play(4)
    player1.play(6)
    expect(player1.outcome()).toBe(1);    
    player2.play(0)
    player2.play(1)
    player2.play(2)
    player2.play(4)
    player2.play(3)
    player2.play(7)
    expect(player2.outcome()).toBe(2);
    unfinished.play(0)
    unfinished.play(1)
    unfinished.play(2)
    unfinished.play(3)
    unfinished.play(4)
    unfinished.play(5)
    unfinished.play(7)
    unfinished.play(8)
    expect(unfinished.outcome()).toBe(-1)
  });
});

describe("gameAI",function(){
  it("chooses the state with lowest chance of losing", function(){
    var testGame = new GameBoard()
    var testAI = new GameAI(testGame)
    expect(testAI.pickState()).toBe("000010000");
  });

  it("returns move number to transition to the best state", function(){
    var testGame = new GameBoard()
    var testAI = new gameAI(testGame)
    expect(testAI.makeMove()).toBe(4);
  });
});

var endTime = Date.now()
console.log(endTime-startTime, "miliseconds to run tests" )

/*
  it("template", function(){    
    expect().toBe();
  });
*/