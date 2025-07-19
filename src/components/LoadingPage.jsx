const LoadingPage = ({ numberOfInputBox , remark }) => {
  const array = new Array(+numberOfInputBox).fill(0);
  return (
    <div className="flex flex-col gap-4 custom-container grow border border-black">
      {array.map((data, index) => (
        <div key={index} className="flex flex-col gap-2">
          <p className="p-2 w-[50%] bg-slate-100/20 rounded-md animate-pulse"></p>
          <p className="p-6 w-full bg-slate-100/20 rounded-md animate-pulse"></p>
        </div>
      ))}

      {remark ? (
        <div className="flex flex-col gap-2">
          <p className="p-2 w-[70%] bg-slate-100/20 rounded-md animate-pulse"></p>
          <p className="p-6 w-full bg-slate-100/20 rounded-md animate-pulse h-[300px]"></p>
        </div>
      ) : null}
      <p className="p-6 w-full bg-slate-100/20 rounded-md animate-pulse  mt-auto"></p>
    </div>
  );
};

export default LoadingPage;
