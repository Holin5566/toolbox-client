import React from "react";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";

const Tag = ({ tag, Logo }) => {
  // 預設 logo = FaReact
  Logo = Logo ? Logo : FaReact;
  const { name } = tag;

  return (
    <motion.button
      className={`px-2 py-1 m-2 font-bold bg-gray-200 border-2 border-gray-500 rounded-full flex items-center`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Logo className="w-5 h-5" />
      {name}
    </motion.button>
  );
};

export default Tag;
