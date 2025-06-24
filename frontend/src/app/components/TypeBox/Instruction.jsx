const Instruction = ({button, desc}) => {
  return (
    <p className="text-gray-300 text-xl">
      <kbd className="ml-2 mr-2 px-2 py-0.5 text-lg font-semibold text-gray-600 bg-gray-900 border-gray-200  dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 rounded-xl">
        {button}
      </kbd>
      - {desc}
    </p>
  );
};

export default Instruction;
