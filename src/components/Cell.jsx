import Card from "./Card.jsx";
import { useState } from "react";
import Digits from "./Digits.jsx";
import { useDispatch, useSelector } from "react-redux";
import { insertNumber } from "../store/boardSlice.js";

const Cell = ({ children, isEmpty, cellIndex, rowIndex }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [chosenNumber, setChosenNumber] = useState(null);

  const dispatch = useDispatch();

  function setOpenDialogHandler() {
    setOpenDialog((prev) => !prev);
  }

  const setChosenNumberHandler = (number) => {
    setChosenNumber(number);
    dispatch(
      insertNumber({
        cellIndex: cellIndex,
        rowIndex: rowIndex,
        number: number,
      }),
    );
  };

  return (
    <div
      className="flex justify-center items-center p-6 border border-gray-500 bg-amber-200 h-24"
      onClick={isEmpty && setOpenDialogHandler}
    >
      {openDialog && <Digits setNumber={setChosenNumberHandler} />}
      {chosenNumber && (
        <Card hiddenNumber={chosenNumber} color={"bg-amber-950"} />
      )}
      {chosenNumber && (
        <Card hiddenNumber={chosenNumber} color={"bg-amber-400"} />
      )}
      {chosenNumber && (
        <Card hiddenNumber={chosenNumber} color={"bg-amber-500"} />
      )}
      {children}
    </div>
  );
};

export default Cell;
