export default function Container({ children }) {
  return (
    <div className="container flex flex-col justify-center items-center m-4 p-4 h-full w-full bg-amber-50">
      {children}
    </div>
  );
}
