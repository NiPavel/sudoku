// hiddenNumber - number of card
const Card = ({ number, color, hiddenNumber, className }) => {
  return (
    <div
      className={`${color} ${className} flex justify-center items-center p-4 border`}
    >
      {number}
    </div>
  );
};

export default Card;
