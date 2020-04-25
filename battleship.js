'use strict';
const isValidateField = (field) => {
  const isValidCell = (arr, i, j) => {
    if (i === arr.length - 1) {
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
    return true && isValidCell(arr, i, (j + 1));
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

