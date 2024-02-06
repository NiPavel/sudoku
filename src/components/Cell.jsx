import Card from "./Card.jsx";

const Cell = ({ children }) => {
  return (
    <div className="flex justify-center items-center p-6 border border-gray-50 bg-amber-200 bg-">
      {children}
    </div>
  );
};

export default Cell;
