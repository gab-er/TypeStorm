import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_DURATION = 0.35;
const Animation = ({
  children,
  id,
  visible = true,
  animationDuration = DEFAULT_DURATION,
  positioning = "absolute"
}) => {
  // To use this component,
  // 1. provide the prop ID with a unique identifier,
  // 2. provide the boolean condition as to when the children should be visible (true by default)
  // 3. provide the duration you want the animation to have
  // 4. provide the positioning type (flex/absolute) depending on the outer container
  // 5. Use this to wrap the children you want to animate
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: animationDuration, ease: "easeInOut" }}
          className={`${positioning}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Animation;
