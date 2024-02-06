import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filledCellsCounter: 81,
  board1: [
    [4, 6, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 1, 6, 9, 0, 0, 0, 0],
    [0, 7, 8, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 8, 0, 0, 0, 1],
    [9, 0, 0, 0, 0, 0, 0, 0, 7],
    [7, 0, 0, 0, 4, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 6, 8, 0],
    [0, 0, 0, 0, 5, 9, 2, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 9, 3],
  ],
  board2: [
    [4, 6, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 1, 6, 9, 0, 0, 0, 0],
    [0, 7, 8, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 8, 0, 0, 0, 1],
    [9, 0, 0, 0, 0, 0, 0, 0, 7],
    [7, 0, 0, 0, 4, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 6, 8, 0],
    [0, 0, 0, 0, 5, 9, 2, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 9, 3],
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    insertNumber: (state, action) => {
      const { cellIndex, number, rowIndex } = action.payload;
      state.filledCellsCounter++;
      state.board2[rowIndex][cellIndex] = number;
    },
  },
});

export const { insertNumber } = boardSlice.actions;

export default boardSlice.reducer;
