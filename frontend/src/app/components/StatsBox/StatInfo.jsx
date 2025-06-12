const StatInfo = ({ title, stat }) => {
  // Checking if it is the error stat -> shows red if there are > 0 errors
  const textColor =
    title === "Errors" && stat > 0 ? "text-red-400" : "text-blue-300";

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="text-gray-400">
        <strong> {title} </strong>
      </div>

      <div className={`text-4xl ${textColor}`}>{stat}</div>
    </div>
  );
};

export default StatInfo;
