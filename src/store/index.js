import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./boardSlice.js";

export const store = configureStore({
  reducer: { board: boardSlice },
});
