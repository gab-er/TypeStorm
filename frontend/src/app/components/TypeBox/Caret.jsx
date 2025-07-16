const Caret = ({ startedTyping }) => {
  // use blink-caret to add blinking
  return (
    <span
      className="flex select-none absolute 
     text-2xl w-[3px] h-[1.6em] rounded-2xl caret-color"
    ></span>
  );
};

export default Caret;
