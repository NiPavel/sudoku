import Container from "./Container.jsx";
import SubGrid from "./SubGrid.jsx";

export default function Board() {
  const subGrids = [];
  for (let i = 0; i < 9; i++) {
    let flag = false;
    if (i === 0) {
      flag = true;
      subGrids.push(
        <SubGrid
          filledCells={[
            { index: 0, number: 4 },
            { index: 1, number: 6 },
            { index: 5, number: 1 },
            { index: 7, number: 7 },
            { index: 8, number: 8 },
          ]}
        />,
      );
    }
    if (i === 1) {
      flag = true;
      subGrids.push(
        <SubGrid
          filledCells={[
            { index: 0, number: 2 },
            { index: 3, number: 6 },
            { index: 4, number: 9 },
          ]}
        />,
      );
    }
    if (i === 3) {
      flag = true;
      subGrids.push(
        <SubGrid
          filledCells={[
            { index: 2, number: 4 },
            { index: 3, number: 9 },
            { index: 6, number: 7 },
          ]}
        />,
      );
    }
    if (i === 4) {
      flag = true;
      subGrids.push(
        <SubGrid
          filledCells={[
            { index: 1, number: 8 },
            { index: 7, number: 4 },
          ]}
        />,
      );
    }
    if (i === 5) {
      flag = true;
      subGrids.push(
        <SubGrid
          filledCells={[
            { index: 2, number: 1 },
            { index: 5, number: 7 },
            { index: 6, number: 3 },
          ]}
        />,
      );
    }
    if (i === 7) {
      flag = true;
      subGrids.push(
        <SubGrid
          filledCells={[
            { index: 4, number: 5 },
            { index: 5, number: 9 },
            { index: 8, number: 6 },
          ]}
        />,
      );
    }
    if (i === 8) {
      flag = true;
      subGrids.push(
        <SubGrid
          filledCells={[
            { index: 0, number: 6 },
            { index: 1, number: 8 },
            { index: 3, number: 2 },
            { index: 7, number: 9 },
            { index: 8, number: 3 },
          ]}
        />,
      );
    }
    if (!flag) subGrids.push(<SubGrid />);
  }

  return (
    <Container>
      <div className="grid grid-cols-3 grid-rows-3">
        {subGrids.map((sub) => {
          return sub;
        })}
      </div>
    </Container>
  );
}
