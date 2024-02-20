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
  collectRows,
  collectSubGrids,
  shuffleTheBoard,
} from "../store/boardSlice.js";

export default function Board() {
  const dispatch = useDispatch();
  const [showCollectButtons, setShowCollectButtons] = useState(false);
  const [fill, setFill] = useState(false);

  const counter = useSelector((state) => state.board.filledCellsCounter);
  const board2 = useSelector((state) => state.board.board2);
  const solution = useSelector((state) => state.board.bigArray);

  const [start, setStart] = useState(true);
  const [fillTheBoard, setFillTheBoard] = useState(false);
  const [colRows, setColRows] = useState(false);
  const [colCols, setColCols] = useState(true);
  const [colGrids, setColGrids] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [check, setCheck] = useState(false);
  const [rightSolution, setRightSolution] = useState(false);
  const [sol, setSol] = useState(false);

  const showCollectHandler = () => {
    setShowCollectButtons(true);
  };

  const startGame = () => {
    dispatch(initialize());
    dispatch(copy());
    setStart(false);
  };

  const collectColumnsHandler = () => {
    dispatch(collectColumns());
    setColRows(true);
    setColCols(false);
  };

  const collectRowsHandler = () => {
    dispatch(collectRows());
    setColGrids(true);
    setColRows(false);
  };

  const collectSubGridsHandler = () => {
    dispatch(collectSubGrids());
    setShuffle(true);
    setColGrids(false);
  };

  const fillRandomDecisionHandler = () => {
    dispatch(fillRandomDecision());
    setFill(true);
    setFillTheBoard(true);
  };

  const shuffleAllCardsHandler = () => {
    dispatch(shuffleTheBoard());
    setShuffle(false);
    setCheck(true);
  };

  if (sol) {
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  const checkSolutionHandler = () => {
    setSol(true);
    for (let i = 0; i < 28; i++) {
      let deck = new Set();
      for (let j = 0; j < solution[i].length; j++) {
        let number = solution[i][j].number;
        if (number) {
          if (deck.has(number)) {
            console.log("Solution is not correct");
            return "The solution is not correct!";
          }
          deck.add(number);
        }
      }
    }
    setRightSolution(true);
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center w-full">
        {sol && rightSolution && (
          <div>
            <p className={"text-6xl text-green-700"}>
              The solution is Correct!
            </p>
          </div>
        )}
        {sol && !rightSolution && (
          <div>
            <p className={"text-6xl text-red-700"}>
              The solution is not Correct!
            </p>
          </div>
        )}
        {!sol && (
          <div className="grid grid-cols-9">
            {board2.map((row, rowIndex) => {
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
                        {cell.show ? (
                          <Cell
                            isEmpty={false}
                            cellIndex={cellIndex}
                            rowIndex={rowIndex}
                            fill={true}
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
                          >
                            {cell.cards.map((color) => (
                              <Card hiddenNumber={cell.number} color={color} />
                            ))}
                          </Cell>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {!sol && (
          <div className="grid grid-cols-9 gap-x-20 mt-2">
            {solution[0].length > 0 &&
              Array.from({ length: 9 }).map((_, colIndex) =>
                solution
                  .filter((_, rowIndex) => rowIndex < 9)
                  .map((row) => {
                    const cell = row[colIndex];
                    return (
                      <Card
                        className={"m-1"}
                        number={cell && cell.show ? cell.number : ""}
                        color={cell && cell.deletedColors[0]}
                      />
                    );
                  }),
              )}
          </div>
        )}

        {counter >= 81 && (
          <div className="flex flex-col m-2 justify-around">
            {start && (
              <div className="flex flex-col gap-2 items-center justify-center">
                <ol type={"1"} className="text-black">
                  <li>
                    The prover places three cards on each cell. On filled-in
                    cells of the puzzle he places three cards with the assigned
                    value, faced up (this can be done by the verifier as well).
                    On the rest of the cells the prover places the cards
                    according to the solution, faced down.
                  </li>
                  <li>
                    For each row, column and subgrid, the verifier chooses (at
                    random) one of the three cards of each cell in the
                    corresponding row/column/subgrid. and makes packets out of
                    the chosen cards. I.e. he assembles the cards chosen for
                    that row, columns or subgrid.
                  </li>
                  <li>
                    The prover shuffles each of the 27 packets separately, and
                    hands the shuffled packets to the verifier.
                  </li>
                  <li>
                    The verifier turns over all the cards in each packet, and
                    verifies that in each packet all numbers appear.
                  </li>
                </ol>
                <button
                  className="flex m-2 justify-around text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200 w-auto"
                  onClick={startGame}
                >
                  Start Game
                </button>
              </div>
            )}

            {!start && !fillTheBoard && (
              <button
                className="flex m-2 justify-around text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200"
                onClick={fillRandomDecisionHandler}
              >
                Fill Random Solution
              </button>
            )}

            {!start && fillTheBoard && !showCollectButtons && (
              <button
                className="flex m-2 justify-around text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200"
                onClick={showCollectHandler}
              >
                Verify
              </button>
            )}

            {showCollectButtons && (
              <div className="flex justify-around p-2 m-2">
                {colCols && (
                  <button
                    onClick={collectColumnsHandler}
                    className="text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200 mx-4"
                  >
                    Collect Columns
                  </button>
                )}

                {colRows && (
                  <button
                    onClick={collectRowsHandler}
                    className="text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200"
                  >
                    Collect Rows
                  </button>
                )}

                {colGrids && (
                  <button
                    onClick={collectSubGridsHandler}
                    className="text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200"
                  >
                    Collect SubGrids
                  </button>
                )}

                {shuffle && (
                  <button
                    className="flex m-2 justify-around text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200"
                    onClick={shuffleAllCardsHandler}
                  >
                    Shuffle all cards
                  </button>
                )}

                {check && (
                  <button
                    className="flex m-2 justify-around text-black p-4 tetx-xl border border-black rounded-2xl hover:bg-gray-200"
                    onClick={checkSolutionHandler}
                  >
                    Check the solution
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {!sol && (
        <div className="grid grid-cols-9 gap-y-10 mb-[900px] mx-2">
          {solution[9].length > 0 &&
            solution
              .filter((arr, index) => index > 8 && index < 18)
              .map((filteredArr) =>
                filteredArr.map((cell) => {
                  return (
                    <Card
                      className={"m-1"}
                      number={cell.show ? cell.number : ""}
                      color={cell.deletedColors[1]}
                    />
                  );
                }),
              )}
        </div>
      )}
    </Container>
  );
}
