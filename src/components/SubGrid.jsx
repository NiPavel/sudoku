import Cell from "./Cell.jsx";
import Card from "./Card.jsx";
import EmptyCell from "./EmptyCell.jsx";
import { useState } from "react";
import Digits from "./Digits.jsx";

const SubGrid = ({ filledCells }) => {
  const [openDialog, setOpenDialog] = useState(false);

  function setOpenDialogHandler() {
    setOpenDialog((prev) => !prev);
  }

  const cells = [];
  for (let i = 0; i < 9; i++) {
    let flag = false;
    if (filledCells && filledCells.length > 0) {
      filledCells.forEach((cell) => {
        if (i === cell.index) {
          flag = true;
          cells.push(
            <Cell>
              <Card number={cell.number} color={"bg-amber-950"} />
            </Cell>
          );
        }
      });
    }
    if (!flag) {
      cells.push(
        <Cell>
          <EmptyCell setDialog={setOpenDialogHandler} color={"bg-amber-950"} />
        </Cell>
      );
    }
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3 border border-black">
      {cells.map((cell) => {
        return cell;
      })}
      {openDialog && <Digits />}
    </div>
  );
};

export default SubGrid;
