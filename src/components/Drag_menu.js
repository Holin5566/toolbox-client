import React from "react";
import { motion } from "framer-motion";

const Drag_menu = ({ constraintsRef }) => {
  return (
    <motion.div
      className="z-auto w-10 bg-black border"
      drag
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 100 }}
    >
      drag
    </motion.div>
  );
};

export default Drag_menu;
