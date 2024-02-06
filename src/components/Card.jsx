// hiddenNumber - number of card
const Card = ({ number, color, hiddenNumber }) => {
  return (
    <div className={`${color} flex justify-center items-center p-4 border`}>
      {number}
    </div>
  );
};

export default Card;
