to run:
git clone
cd into directory
bundle install
rails s

to run tests:
while server is running, visit /specs

design thoughts
split AI and board logic into different object classes.
AI is initialized with it's player state, 1 or 2.
AI should be able to respond to a 9 character string of 0's, 1's and 2's and decide where to place it's marker.

AI notes: 
  Board evaluation http://rowdy.msudenver.edu/~gordona/cs1050/progs/tictactoermccsc.pdf
    perfect square [[8,1,6],[3,5,7],[4,9,2]], columns, rows and diagnols sum to 15.
      alt [8,1,6,3,5,7,4,9,2]
      taken1, taken2 = Hash.new(false), Hash.new(false)
      existingPairs1 = Hash.new(false)
      existingPairs2 = Hash.new(false)
      for(var key in takene){ if(takene[key]) {existinPairse[key+move]=true} }
    keeping a table of taken moves and existing pair moves allows wins to be found by checking
      existingPairs[15-move], if true for self, it's a win move, if true for other, it's a block move.
  wiki article on strategy http://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
  gameTree comprised of gameNodes
  gameNode has children attribute, array of other nodes
  gameNode has totalChildren attribute, integer
  gameNode has winWeight, loseWeight, tieWeight from a players perspective
  tree population algorithm:
    1: start at root "000000000" or current state,
    2: check for victory
      2a: if victory, assign weight of nodes appropriately and return to parent
      2bI: if no victory, populate children of current state with legal moves
      2bII: sum weights of children linearly to determine own weight.
  observation: current rendering of game tree is A: highly redundant, no symmetries exploited
  B: disagrees with percentage of winning states for player 1 by about 8 percent, 2 by 3 percent, and ties 10 percent.
  C: is definitely double counting some things, because 9! is less than .55 million