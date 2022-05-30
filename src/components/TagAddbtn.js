import React, { useRef, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { URL } from "..";
import { useSelector } from "react-redux";

const Tag_Addbtn = () => {
  const [open, setOpen] = useState(false);
  const { isLogin } = useSelector((state) => state);
  const nameRef = useRef();

  const handleSubmit = async () => {
    const name = nameRef.current.value;
    if (!name) {
      return alert("請勿留白");
    }
    // await axios.post(`${URL}/api/tag`, { name });
    nameRef.current.value = null;
    setOpen(false);
  };
  // TODO 設計標籤邏輯
  return (
    <button className="flex items-center m-2 overflow-hidden bg-gray-500 rounded-full">
      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            className="flex items-center rounded-full"
            initial={{ width: 0, opacity: 0, margin: 0 }}
            animate={{ width: 230, opacity: 1, margin: 5 }}
            exit={{ width: 0, opacity: 0, margin: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            <input
              type="text"
              className="px-2 border rounded-full"
              placeholder="施工中"
              ref={nameRef}
            />
            <FiSend
              className="w-5 h-5 mx-2 text-gray-300 my-btn"
              onClick={handleSubmit}
            />
          </motion.div>
        )}
        <AiFillPlusCircle
          className="z-10 text-gray-300 bg-gray-500 w-9 h-9"
          onClick={() => {
            if (!isLogin) {
              return window.alert("請連結Github");
            }
            setOpen(!open);
          }}
        />
      </AnimatePresence>
    </button>
  );
};

export default Tag_Addbtn;
