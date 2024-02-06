const Digits = () => {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="absolute  bg-white p-0.5   ">
      <div className="flex justify-center items-center p-1 w-full">
        {digits.map((digit) => {
          return (
            <div className="p-1 text-black mx-1.5 border hover:cursor-pointer hover:bg-gray-200">
              {digit}
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
};
export default Digits;
