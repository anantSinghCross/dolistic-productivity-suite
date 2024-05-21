export default function ProgressBar({ progress }) {
  const barVariants = {
    incomplete:
      "rounded-full h-3 bg-gradient-to-t from-blue-300 to-indigo-400 shadow-md shadow-blue-100",
    complete:
      "rounded-full h-3 bg-gradient-to-t from-green-300 to-teal-400 shadow-md shadow-teal-100",
  };

  const textVariants = {
    incomplete:
      "w-max font-bold text-transparent bg-gradient-to-t from-blue-300 to-indigo-400 bg-clip-text",
    complete:
      "w-max font-bold text-transparent bg-gradient-to-t from-green-300 to-teal-400 bg-clip-text",
  };

  const variantName = progress == 100 ? "complete" : "incomplete";

  return (
    <div className=" mb-2 flex items-center w-full gap-2">
      <div className="rounded-md h-3 w-full shadow-inner bg-gray-50">
        <div className={barVariants[variantName]} style={{ width: `${progress}%` }}></div>
      </div>
      <span className={textVariants[variantName]}>{`${progress}%`}</span>
    </div>
  );
}
