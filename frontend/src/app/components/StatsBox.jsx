"use client";
import useWordsStore from "../stores/useWordsStore";

const StatsBox = () => {
  const lettersCorrectlyTyped = useWordsStore(
    (state) => state.lettersCorrectlyTyped
  );

  const lettersTyped = useWordsStore(
    (state) => state.lettersTyped
  );

  const errors = useWordsStore(
    (state) => state.errors
  );
  return <div>
    <p> LETTERS CORRECTLY TYPED : {lettersCorrectlyTyped} </p>
    <p> LETTERS TYPED: {lettersTyped} </p>
    <p> ERRORS: {errors} </p>
    </div>;
};

export default StatsBox;
