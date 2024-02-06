import Cell from "./Cell.jsx";
import Card from "./Card.jsx";

const SubGrid = ({ filledCells }) => {
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
            </Cell>,
          );
        }
      });
    }
    if (!flag) {
      cells.push(
        <Cell>
          <Card color={"bg-amber-950"} />
        </Cell>,
      );
    }
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3 border border-black">
      {cells.map((cell) => {
        return cell;
      })}
    </div>
  );
};

export default SubGrid;
