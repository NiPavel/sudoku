import Card from "./Card.jsx";
import { useState } from "react";
import Digits from "./Digits.jsx";
import { useDispatch, useSelector } from "react-redux";
import { insertNumber } from "../store/boardSlice.js";

const Cell = ({ children, isEmpty, cellIndex, rowIndex, fill }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [filled, setFilled] = useState(false);

  const board = useSelector((state) => state.board.board2);

  const dispatch = useDispatch();

  function setOpenDialogHandler() {
    setOpenDialog((prev) => !prev);
  }

  const setChosenNumberHandler = (number) => {
    dispatch(
      insertNumber({
        cellIndex: cellIndex,
        rowIndex: rowIndex,
        number: number,
      }),
    );
    setFilled(true);
  };

  return (
    <div
      className="flex justify-center items-center p-6 border border-gray-500 bg-amber-200 h-24"
      onClick={isEmpty && setOpenDialogHandler}
    >
      {openDialog && <Digits setNumber={setChosenNumberHandler} />}
      {board[rowIndex][cellIndex] !== 0 && isEmpty && (fill || filled) && (
        <Card
          hiddenNumber={board[rowIndex][cellIndex]}
          color={"bg-amber-950"}
        />
      )}
      {board[rowIndex][cellIndex] !== 0 && isEmpty && (fill || filled) && (
        <Card
          hiddenNumber={board[rowIndex][cellIndex]}
          color={"bg-amber-400"}
        />
      )}
      {board[rowIndex][cellIndex] !== 0 && isEmpty && (fill || filled) && (
        <Card
          hiddenNumber={board[rowIndex][cellIndex]}
          color={"bg-amber-500"}
        />
      )}
      {children}
    </div>
  );
};

export default Cell;
