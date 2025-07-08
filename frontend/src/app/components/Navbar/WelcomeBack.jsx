import useAuthStore from "../../stores/useAuthStore";
import { TypeAnimation } from "react-type-animation";
import "../../../app/globals.css";

const WelcomeBack = () => {
  const username = useAuthStore((state) => state.username);

  // Custom animation in globals.css
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";

  return (
    <>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          `welcome back, ${username}`,
          (el) => el.classList.remove(CURSOR_CLASS_NAME), // A reference to the element gets passed as the first argument of a callback function
          1000,
        ]}
        wrapper="span"
        className={CURSOR_CLASS_NAME}
        speed={15}
        cursor={false}
      />
    </>
  );
};

export default WelcomeBack;
