//Brick
let brick = {
    rowCount:16,
    columnCount:10,
    width:50,
    height:20,
    padding:2,
    offSetTop:2,
    offSetLeft:70
}

const colors = ['red', '#000080', 'yellow', 'green', 'blue','red','#000080'];

var Levels = [
    ['OOOOOUOOOOOOOOOO',
     'OOOOOOOOOOOOOOOO',
     'OOOOObOOOOOOOOOO',
     'OOOOO52B2UOOOOOO',
     'OOOOO4O2ObOOOOOO',
     'OOOOO3O2O5OOOOOO',
     'OOOOO1O2O4OOOOOO',
     'OOOOO1O2O3OOOOOO',
     'OOOOOOO2O1OOOOOO',
     'OOOOOOOOO1OOOOOO'],



    ['OOOOO11OO11OOOOO',
     'OOOO2UU22UU2OOOO',
     'OOO12OOBBOO21OOO',
     'OOO12O5225O21OOO',
     'OOO1BO4224OB1OOO',
     'OOOO12222221OOOO',
     'OOOOO111111OOOOO',
     'OOOOO111111OOOOO',
     'OOOOOO1UU1OOOOOO',
     'OOOOOOO11OOOOOOO'],

    ['O21111111111112O',
     'OO21b111111b12OO',
     'OO121111111121OO',
     'OOO121U11U121OOO',
     'OOOO5B1221B5OOOO',
     'OOOOO421124OOOOO',
     'OOOOOO3223OOOOOO',
     'OOOOOOO22OOOOOOO',
     'OOOOOOOOOOOOOOOO',
     'OOOOOOOUUOOOOOOO'],
];


var bricks = [];

function initBricks() { 
  let level = Levels[curLevel-1];
  for (let c = 0; c < brick.columnCount; c++) {
      bricks[c] = [];
      var rowColumns = level[c];
      for (let r = 0; r < brick.rowCount; r++) {
          // block numbers from 1 to 5
          if (!isNaN(rowColumns.charAt(r))) {
            bricks[c][r] = {
              x : r * (brick.width + brick.padding) + brick.offSetLeft,
              y : c * (brick.height + brick.padding) + brick.offSetTop,
              status : 1,
              health: parseInt(rowColumns.charAt(r))
            };
          }
          // empty block
          if (rowColumns.charAt(r) === 'O') {
            bricks[c][r] = {
              x : r * (brick.width + brick.padding) + brick.offSetLeft,
              y : c * (brick.height + brick.padding) + brick.offSetTop,
              status : 0,
              health: 0
            };
          }
          // unbreakable block
          if (rowColumns.charAt(r) === 'U'){
             bricks[c][r] = {
              x : r * (brick.width + brick.padding) + brick.offSetLeft,
              y : c * (brick.height + brick.padding) + brick.offSetTop,
              status : 1,
              health:  6
            };
          }
          // Bonus block
          if (rowColumns.charAt(r) === 'B' || rowColumns.charAt(r) === 'b'){
             bricks[c][r] = {
              x : r * (brick.width + brick.padding) + brick.offSetLeft,
              y : c * (brick.height + brick.padding) + brick.offSetTop,
              status : 1,
              health: rowColumns.charAt(r) === 'B'? 2: 1,
              bonus: Math.floor(Math.random() * (2 - 1 + 1)) + 1
              // when the bonus of the two balls is added just uncomment the following line and remove the upper one
              // bonus: Math.floor(Math.random() * (3 - 1 + 1)) + 1
            };
          }
      }
  }
}
