export default function Container({ children }) {
  return (
    <div className="flex flex-row items-center m-40 p-1 bg-amber-50">
      {children}
    </div>
  );
}
