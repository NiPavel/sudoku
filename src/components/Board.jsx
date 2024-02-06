import Container from "./Container.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";
import Cell from "./Cell.jsx";
import Card from "./Card.jsx";

export default function Board() {
  const [showCollectButtons, setShowCollectButtons] = useState(false);

  const showCollectHandler = () => {
    setShowCollectButtons(true);
  };

  const counter = useSelector((state) => state.board.filledCellsCounter);
  const board = useSelector((state) => state.board.board1);
  const board2 = useSelector((state) => state.board.board2);

  console.log(board2);

  return (
    <Container>
      <div className="grid grid-cols-9">
        {board.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className={`contents`}>
              {row.map((cell, cellIndex) => {
                return (
                  <div
                    key={cellIndex}
                    className={`${
                      (cellIndex + 1) % 3 === 0 && cellIndex !== 8
                        ? "border-r-2 border-black"
                        : ""
                    } ${
                      (rowIndex + 1) % 3 === 0 && rowIndex !== 8
                        ? "border-b-2 border-black"
                        : ""
                    }`}
                  >
                    {cell !== 0 ? (
                      <Cell
                        isEmpty={false}
                        cellIndex={cellIndex}
                        rowIndex={rowIndex}
                      >
                        <Card number={cell} color={"bg-amber-950"} />
                        <Card number={cell} color={"bg-amber-400"} />
                        <Card number={cell} color={"bg-amber-500"} />
                      </Cell>
                    ) : (
                      <Cell
                        isEmpty={true}
                        cellIndex={cellIndex}
                        rowIndex={rowIndex}
                      ></Cell>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {counter >= 81 && (
        <div className="flex flex-col m-2 justify-around">
          <button
            className="flex m-2 justify-around text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200"
            onClick={showCollectHandler}
          >
            Verify
          </button>
          {showCollectButtons && (
            <div className="flex justify-around p-2 m-2">
              <button className="text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200">
                Collect Rows
              </button>
              <button className="text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200 mx-4">
                Collect Columns
              </button>
              <button className="text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200">
                Collect SubGrids
              </button>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}
