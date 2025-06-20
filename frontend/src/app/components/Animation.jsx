import { motion, AnimatePresence } from "framer-motion";

const Animation = ({ children, id, visible = true }) => {
  // To use this component, 
  // 1. provide the prop ID with a unique identifier, 
  // 2. provide the boolean condition as to when the children should be visible (true by default)
  // 3. Use this to wrap the children you want to animate
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Animation;
