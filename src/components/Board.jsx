import Container from "./Container.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cell from "./Cell.jsx";
import Card from "./Card.jsx";
import {
  copy,
  initialize,
  collectColumns,
  fillRandomDecision,
} from "../store/boardSlice.js";

export default function Board() {
  const dispatch = useDispatch();
  const [showCollectButtons, setShowCollectButtons] = useState(false);
  const [fill, setFill] = useState(false);

  const showCollectHandler = () => {
    setShowCollectButtons(true);
  };

  const startGame = () => {
    dispatch(initialize());
    dispatch(copy());
  };

  const collectColumnsHandler = () => {
    dispatch(collectColumns());
  };

  const fillRandomDecisionHandler = () => {
    dispatch(fillRandomDecision());
    setFill(true);
  };

  const randomColor = () => {
    const colors = ["bg-amber-950", "bg-amber-400", "bg-amber-500"];
    const random = Math.floor(Math.random() * 3);
    return colors[random];
  };

  const counter = useSelector((state) => state.board.filledCellsCounter);
  const board = useSelector((state) => state.board.board);
  const board2 = useSelector((state) => state.board.board2);

  const solution = useSelector((state) => state.board.bigArray);
  console.log(solution);

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
                    {cell.number !== 0 ? (
                      <Cell
                        isEmpty={false}
                        cellIndex={cellIndex}
                        rowIndex={rowIndex}
                        fill={fill}
                      >
                        {cell.cards.map((color) => (
                          <Card number={cell.number} color={color} />
                        ))}
                      </Cell>
                    ) : (
                      <Cell
                        isEmpty={true}
                        cellIndex={cellIndex}
                        rowIndex={rowIndex}
                        fill={fill}
                      ></Cell>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-9 gap-x-20 mt-2">
        {solution[0].length > 0 &&
          solution
            .filter((arr, index) => index < 9)
            .map((filteredArr) =>
              filteredArr.map((number) => {
                const color = randomColor();
                return <Card className={"m-1"} color={color} />;
              }),
            )}
      </div>
      {counter >= 81 && (
        <div className="flex flex-col m-2 justify-around">
          <button
            className="flex m-2 justify-around text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200"
            onClick={startGame}
          >
            Start
          </button>
          <button
            className="flex m-2 justify-around text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200"
            onClick={showCollectHandler}
          >
            Verify
          </button>
          <button
            className="flex m-2 justify-around text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200"
            onClick={fillRandomDecisionHandler}
          >
            Fill Random Decision
          </button>
          {showCollectButtons && (
            <div className="flex justify-around p-2 m-2">
              <button className="text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200">
                Collect Rows
              </button>
              <button
                onClick={collectColumnsHandler}
                className="text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200 mx-4"
              >
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
