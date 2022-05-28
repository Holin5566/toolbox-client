import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiAcademicCap, HiUserGroup } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { URL } from "..";

const CardFooterBtn = ({ tool }) => {
  const { _id } = tool;
  const { usedDHT, interestedDHT } = useSelector((state) => state);
  const [userlist, setUserlist] = useState({
    title: "",
    list: [],
    open: false,
  });

  const handleUsedUsers = async () => {
    const { data } = await axios.get(`${URL}/api/tool/used_users?_id=${_id}`);
    if (data.length < 1)
      return setUserlist({
        title: "暫無人使用",
        list: [],
        open: !userlist.open,
      });
    setUserlist({ title: "誰使用過:", list: data, open: !userlist.open });
  };

  const handleInterestedUsers = async () => {
    const { data } = await axios.get(
      `${URL}/api/tool/interested_users?_id=${_id}`
    );
    if (data.length < 1)
      return setUserlist({
        title: "暫無人關注",
        list: [],
        open: !userlist.open,
      });
    setUserlist({ title: "誰想試試:", list: data, open: !userlist.open });
  };

  return (
    <div className="relative flex flex-wrap justify-between w-full my-2">
      <AnimatePresence>
        <motion.button
          key="usedBtn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleUsedUsers}
          className={`text-${
            usedDHT[_id] ? "sky-500" : "gray-400 hover:text-gray-800"
          }`}
        >
          <HiAcademicCap className="w-6 h-6" />
        </motion.button>
        <motion.button
          key="interestedBtn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleInterestedUsers}
          className={`items-center text-${
            interestedDHT[_id] ? "rose-300" : "gray-400"
          } hover:text-gray-800`}
        >
          <div className="text-rose-300">{/*"載入 tailwind class"*/}</div>
          <HiUserGroup className="w-6 h-6 " />
        </motion.button>
        {userlist.open && (
          <motion.div
            className="w-full text-center max-h-28 overflow-auto" // 7rem
            initial={{ height: 0, opacity: 0 }}
            exit={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ type: "spring", mass: 0.1 }}
          >
            <h3 className=" font-bold text-lg">{userlist.title}</h3>
            {userlist.list.map((user) => (
              <p key={user.name}>{user.name}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardFooterBtn;
