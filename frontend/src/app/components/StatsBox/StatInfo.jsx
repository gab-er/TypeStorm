const StatInfo = ({ title, stat, pbWpm, aaWpm, pbAccuracy, aaAccuracy }) => {
  // Checking if it is the error stat -> shows red if there are > 0 errors
  let textColor =
    title === "Errors" && stat > 0 ? "text-red-400" : "text-blue-400";
  let emoji = "";
  let achievement = "";

  // Set displays for new PB
  if (pbWpm) {
    textColor = "text-yellow-400";
    emoji = "🎉";
    achievement = "(New Personal Best!)";
  } else if (aaWpm) {
    textColor = "text-green-400";
    achievement = "(Above Average!)";
  }

  if (pbAccuracy) {
    textColor = "text-yellow-400";
    emoji = "🎉";
    achievement = "(New Personal Best!)";
  } else if (aaAccuracy) {
    textColor = "text-green-400";
    achievement = "(Above Average!)";
  }

  return (
    <div className="relative flex flex-col w-full h-full items-center justify-center">
      <div className="absolute top-0 text-sm text-gray-400 mt-[1.5em]"> {achievement} </div>
      <div className="text-gray-400">
        {emoji} <strong> {title} </strong> {emoji}
      </div>

      <div className={`text-4xl ${textColor}`}>{stat}</div>
    </div>
  );
};

export default StatInfo;
