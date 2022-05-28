import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiAddToQueue, BiX } from "react-icons/bi";
import CardForm from "./CardForm";
import { useSelector } from "react-redux";

const CardAddbtn = () => {
  const [open, setOpen] = useState(false);
  const { isLogin } = useSelector((state) => state);

  // NOTE event function
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleLogin = () => {
    if (!isLogin) {
      return window.alert("請連結Github");
    }
    setOpen(!open);
  };

  return (
    <div className="absolute top-2 right-2">
      <div className="relative">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: 500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 500, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <button className="absolute top-0 right-0" onClick={handleOpen}>
                <BiX className="w-10 h-10" />
              </button>
              <CardForm setOpen={setOpen} />
            </motion.div>
          )}
          {!open && (
            <motion.button
              className="absolute top-0 right-0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleLogin}
            >
              <BiAddToQueue className="w-10 h-10" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardAddbtn;
