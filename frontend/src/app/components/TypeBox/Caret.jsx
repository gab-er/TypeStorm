const Caret = ({ startedTyping }) => {
  // use blink-caret to add blinking
  return (
    <span
      className="flex select-none absolute 
    text-yellow-500 text-2xl w-[3px] h-[1.6em] rounded-2xl bg-yellow-500"
    ></span>
  );
};

export default Caret;
