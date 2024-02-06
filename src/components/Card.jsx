const Card = ({ number, color }) => {
  return (
    <div className={`${color} flex justify-center items-center p-4 border`}>
      {number}
    </div>
  );
};

export default Card;
