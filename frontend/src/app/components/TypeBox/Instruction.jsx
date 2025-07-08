const Instruction = ({ button, desc }) => {
  return (
    <p className="text-gray-300 text-xl">
      <kbd className="ml-2 mr-2 px-2 py-0.5 text-sm font-semibold text-white bg-gray-800 border-gray-200  rounded-xl align-middle select-none">
        {button}
      </kbd>
      <span className="select-none text-lg text-gray-500">- {desc}</span>
    </p>
  );
};

export default Instruction;
