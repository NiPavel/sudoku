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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const numberInRow = (number, row, board) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] && board[row][i].number === number) {
      return true;
    }
  }
  return false;
};

const numberInColumn = (number, column, board) => {
  for (let i = 0; i < 9; i++) {
    if (board[i][column] && board[i][column].number === number) {
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
      (board[row][i] && board[row][i].number === number) ||
      (board[i][col] && board[i][col].number === number) ||
      (board[m][n] && board[m][n].number === number)
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
                show: true,
                number: numbers[index],
                cards: ["bg-amber-950", "bg-amber-400", "bg-amber-500"],
                deletedColors: [],
              };
              counter++;
              state.indexForInsert++;
            } else {
              state.board[i][j] = {
                id: state.indexForInsert,
                show: false,
                number: 0,
                cards: ["bg-amber-950", "bg-amber-400", "bg-amber-500"],
                deletedColors: [],
              };
              state.indexForInsert++;
            }
          } else {
            state.board[i][j] = {
              id: state.indexForInsert,
              show: false,
              number: 0,
              cards: ["bg-amber-950", "bg-amber-400", "bg-amber-500"],
              deletedColors: [],
            };
            state.indexForInsert++;
          }
        }
      }
    },
    copy: (state) => {
      state.board2 = [...state.board];
    },
    deleteColor: (state, action) => {
      const { row, column, color } = action.payload;
      state.board2[column][row].cards.filter((card) => card !== color);
    },
    insertNumber: (state, action) => {
      const { cellIndex, number, rowIndex } = action.payload;
      state.filledCellsCounter++;
      state.board2[rowIndex][cellIndex].number = number;
    },
    collectColumns: (state) => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const colors = state.board2[j][i].cards;
          const random = Math.floor(Math.random() * 3);
          const newCards = state.board2[j][i].cards.filter(
            (card) => card !== colors[random],
          );
          state.board2[j][i].cards = [...newCards];
          state.bigArray[state.index].push(state.board2[j][i]);
          state.bigArray[state.index][j].deletedColors.push(colors[random]);
        }
        state.index = state.index + 1;
      }
    },
    collectRows: (state) => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const colors = state.board2[i][j].cards;
          const random = Math.floor(Math.random() * 2);
          const newCards = state.board2[i][j].cards.filter(
            (card) => card !== colors[random],
          );
          state.board2[i][j].cards = [...newCards];
          state.bigArray[state.index].push(state.board2[i][j]);
          state.bigArray[state.index][j].deletedColors.push(colors[random]);
        }
        state.index = state.index + 1;
      }
    },
    collectSubGrids: (state) => {
      for (let rowStart = 0; rowStart < 9; rowStart += 3) {
        for (let colStart = 0; colStart < 9; colStart += 3) {
          for (let row = rowStart; row < rowStart + 3; row++) {
            for (let col = colStart; col < colStart + 3; col++) {
              state.bigArray[state.index].push(state.board2[row][col]);
            }
          }
          state.index++;
        }
      }
    },
    shuffleTheBoard: (state) => {
      const newArr = state.bigArray.map((arr) => shuffleArray([...arr]));
      state.bigArray = [...newArr];
    },
    fillRandomDecision: (state) => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (state.board2[i][j].number === 0) {
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
  deleteColor,
  collectRows,
  collectSubGrids,
  shuffleTheBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
