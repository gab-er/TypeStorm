const Caret = () => {
  // use blink-caret to add blinking 

  return (
    <span className="select-none translate-x-[-5px] translate-y-[1px] absolute text-yellow-500 text-2xl w top-0 left-0">
      |
    </span>
  );
};

export default Caret;
