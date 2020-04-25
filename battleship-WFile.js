export const isValidateField = (field) => {
  const isValidCell = (arr, i, j) => {
    let r = i;
    let c = j;
    if (r === arr.length - 2 && c === arr[r].length - 1) {
      return true;
    }
    if (c === arr[r].length) {
      c = 0;
      r += 1;
    }
    if (arr[r][c] === 1 && (arr[r - 1][c - 1] === 1 || arr[r - 1][c + 1] === 1
    || arr[r + 1][c - 1] === 1 || arr[r + 1][c + 1] === 1)) {
      return false;
    }
    return true && isValidCell(arr, r, (c + 1));// (j + 1) % arr[i].length
  };
  return isValidCell(field, 1, 0);
};

const checkRight = (arr, row, col, limit) => {
  if (col === limit || arr[row][col] === 0) {
    return [];
  }
  return [`${row},${col}`].concat(checkRight(arr, row, col + 1, limit));
};

const checkDown = (arr, row, col, limit) => {
  if (row === limit || arr[row][col] === 0) {
    return [];
  }
  return [`${row},${col}`].concat(checkDown(arr, row + 1, col, limit));
};

const checkCell = (checkedCells, row, col) => checkedCells.indexOf(`${row},${col}`) >= 0;
/*
export const calcShipsCount = (table) => {
  if (table.length === 0) {
    return 0;
  }
  const rowLength = table[0].length;
  const columnLength = table.length;
  let shipCount = 0; // RECURSION will return this
  let checkedCells = [];
  let i = 0;
  let j = 0;
  while (i < columnLength) {
    if (table[i][j] !== 0 && !checkCell(checkedCells, i, j)) {
      checkedCells = table[i][j + 1] === 1 ? checkedCells.concat(checkRight(table, i, j, rowLength))
        : checkedCells.concat(checkDown(table, i, j, columnLength));
      shipCount += 1;
    }
    j += 1;
    if (j === rowLength) {
      i += 1;
      j = 0;
    }
  }
  return shipCount;
};
*/
export const calcShipsCount = (table) => {
  if (table.length === 0) {
    return 0;
  }
  let checkedCells = [];
  const i = 0;
  const j = 0;

  const checkRow = (list, r, c) => {
    if (r === list.length) {
      return 0;
    }
    if (c === list[r].length) {
      return checkRow(list, r + 1, 0);
    }
    if (list[r][c] !== 0 && !checkCell(checkedCells, r, c)) {
      checkedCells = list[r][c + 1] === 1
        ? checkedCells.concat(checkRight(list, r, c, list[0].length))
        : checkedCells.concat(checkDown(list, r, c, list.length));
      return 1 + checkRow(list, r, c + 1);
    }
    return 0 + checkRow(list, r, c + 1);
  };
  return checkRow(table, i, j);
};



// MY IMPROVEMENTS:
// BEGIN (write your solution here)
const isValidateField = (field) => {
  const isValidCell = (arr, i, j) => {
    if (i === arr.length - 1) { // (i === arr.length - 2 && j === arr[i].length - 1) {
      return true;
    }
    if (j === arr[i].length) {
      return isValidCell(arr, i + 1, 0);
    }
    if (arr[i][j] === 1 && arr[i - 1]) {
      if (arr[i - 1][j - 1] === 1 || arr[i - 1][j + 1] === 1) {
        return false;
      }
    }
    if (arr[i][j] === 1 && arr[i + 1]) {
      if (arr[i + 1][j - 1] === 1 || arr[i + 1][j + 1] === 1) {
        return false;
      }
    }
    return true && isValidCell(arr, i, (j + 1));// (j + 1) % arr[i].length
  };
  return isValidCell(field, 0, 0);
};

const checkRow = (list, r, c) => {
  if (r === list.length) {
    return 0;
  }
  if (c === list[r].length) {
    return checkRow(list, r + 1, 0);
  }
  if (list[r][c] && (!list[r - 1]
    || (list[r][c] && !list[r][c - 1] && !list[r - 1][c]))) {
    return 1 + checkRow(list, r, c + 1);
  }
  return 0 + checkRow(list, r, c + 1);
};

const calcShipsCount = (table) => {
  if (table.length === 0) {
    return 0;
  }
  return checkRow(table, 0, 0);
};
export { calcShipsCount, isValidateField };
// END
