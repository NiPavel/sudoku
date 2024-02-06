const EmptyCell = ({ setDialog }) => {
  function handleClickCell() {
    setDialog();
  }

  return (
    <div
      onClick={handleClickCell}
      className="flex justify-center items-center p-4 border bg-amber-300"
    ></div>
  );
};
export default EmptyCell;
