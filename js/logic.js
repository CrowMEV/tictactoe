let players = ["x", "o"];
let activePlayer = 0;
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function startGame() {
  players = ["x", "o"];
  activePlayer = 0;
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  renderBoard(board);
}

function checkCol(idxCol, lengthBorad) {
  const arr = [];
  for (let i = 0; i < lengthBorad; i++) {
    const contional = board[i][idxCol];
    if (contional === players[activePlayer]) {
      arr.push(contional);
    }
  }
  return arr;
}

function checkDiag() {
  return {
    diag: board.filter((el, idx) => el[idx] === players[activePlayer]),
    reverse: [...board]
      .reverse()
      .filter((el, idx) => el[idx] === players[activePlayer]),
  };
}

function checkWiner() {
  const checkingArr = [];
  const boardLength = board.length;
  board.forEach((arr) =>
    checkingArr.push(arr.filter((el) => el === players[activePlayer]))
  );
  for (let i = 0; i < boardLength; i++) {
    checkingArr.push(checkCol(i, boardLength));
  }
  const { diag, reverse } = checkDiag();
  checkingArr.push(diag);
  checkingArr.push(reverse);
  for (const el of checkingArr) {
    if (el.length === boardLength) {
      return true;
    }
  }
  return false;
}

function click(numRow, numCol) {
  board[numRow][numCol] = players[activePlayer];
  renderBoard(board);
  if (checkWiner()) {
    showWinner(activePlayer);
  }
  activePlayer = activePlayer === 1 ? 0 : 1;
}
