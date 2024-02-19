import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filledCellsCounter: 81,
  indexForInsert: 0,
  index: 0,
  board: [[], [], [], [], [], [], [], [], []],
  board2: [],
  bigArray: [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ],
};

const numberInRow = (number, row, board) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === number) {
      return true;
    }
  }
  return false;
};

const numberInColumn = (number, column, board) => {
  for (let i = 0; i < 9; i++) {
    if (board[i][column] === number) {
      return true;
    }
  }
  return false;
};

const numberInSubGrid = (number, board, row, col) => {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (
      board[row][i] === number ||
      board[i][col] === number ||
      board[m][n] === number
    ) {
      return true;
    }
  }
  return false;
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    initialize: (state, action) => {
      state.indexForInsert = 0;
      let counter = 0;
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (counter < 24) {
            const index = Math.floor(Math.random() * 8);
            const number = numbers[index];
            if (
              !numberInRow(number, i, state.board) &&
              !numberInColumn(number, j, state.board) &&
              !numberInSubGrid(number, state.board, i, j)
            ) {
              state.board[i][j] = {
                id: state.indexForInsert,
                number: numbers[index],
                cards: ["bg-amber-950", "bg-amber-400", "bg-amber-500"],
              };
              counter++;
              state.indexForInsert++;
            } else {
              state.board[i][j] = {
                id: state.indexForInsert,
                number: 0,
                cards: ["bg-amber-950", "bg-amber-400", "bg-amber-500"],
              };
              state.indexForInsert++;
            }
          } else {
            state.board[i][j] = {
              id: state.indexForInsert,
              number: 0,
              cards: ["bg-amber-950", "bg-amber-400", "bg-amber-500"],
            };
            state.indexForInsert++;
          }
        }
      }
    },
    copy: (state) => {
      state.board2 = [...state.board];
    },
    insertNumber: (state, action) => {
      const { cellIndex, number, rowIndex } = action.payload;
      state.filledCellsCounter++;
      state.board2[rowIndex][cellIndex].number = number;
    },
    collectColumns: (state) => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          state.bigArray[state.index].push(state.board2[j][i]);
        }
        state.index = state.index + 1;
      }
    },
    fillRandomDecision: (state) => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (state.board2[i][j] === 0) {
            state.board2[i][j].number = Math.floor(Math.random() * 8) + 1;
          }
        }
      }
    },
  },
});

export const {
  insertNumber,
  initialize,
  copy,
  collectColumns,
  fillRandomDecision,
} = boardSlice.actions;

export default boardSlice.reducer;
