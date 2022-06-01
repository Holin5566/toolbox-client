import axios from "axios";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import * as deicons from "react-icons/di";
import { BiBookHeart } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { toggleUsed, toggleInterested } from "../data/user";
import { URL } from "..";
import Tag from "./Tag";
import CardFooterBtn from "./CardFooterBtn";

const capOn =
  "inset-x-1/2 -translate-y-20 -translate-x-1/2  text-sky-500 w-10 h-10";
const capOff = "h-5 w-5";

const Card = ({ tool, Logo }) => {
  Logo = Logo ? Logo : FaReact;
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const { isLogin, user, usedDHT, interestedDHT } = useSelector(
    (state) => state
  );
  const { name, content, _id } = tool;

  //NOTE　event function
  const ckickInterested = () => {
    if (!isLogin) return window.alert("請連結Github");

    const postUserInterested = async (uid, tool_id, exist) => {
      exist
        ? //存在則刪除
          await axios.delete(
            `${URL}/api/user/interested?uid=${uid}&tool_id=${tool_id}`
          )
        : // 不存在則新增
          await axios.post(`${URL}/api/user/interested`, {
            uid,
            tool_id,
          });
      dispatch(toggleInterested.action({ _id }));
    };
    postUserInterested(user.uid, tool._id, interestedDHT[_id]);
  };

  const ckickUsed = () => {
    if (!isLogin) return window.alert("請連結Github");

    const postUserUsed = async (uid, tool_id, exist) => {
      exist
        ? await axios.delete(
            `${URL}/api/user/used?uid=${uid}&tool_id=${tool_id}`
          )
        : await axios.post(`${URL}/api/user/used`, {
            uid,
            tool_id,
          });
      dispatch(toggleUsed.action({ _id }));
    };
    postUserUsed(user.uid, tool._id, usedDHT[_id]);
  };
  // //NOTE get tool's tags
  useEffect(() => {
    axios
      .get(`${URL}/api/tool/tags?_id=${_id}`)
      .then((result) => {
        const { data } = result;
        setTags(data);
      })
      .catch((e) => console.log(e));
  }, [_id]);
  return (
    <motion.div
      className="relative w-full md:w-1/3 lg:w-1/4 px-4 py-2 m-3 my-8 bg-white border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-rose-600"></div>
      {/* card head */}
      <div className="absolute top-0 p-1 -translate-x-1/2 -translate-y-1/2 border-2 rounded-full left-1/2 bg-slate-500">
        <Logo className="w-20 h-20 text-white" />
      </div>
      <h3 className="mt-10 text-xl font-bold text-center border-b-2 ">
        {name}
      </h3>

      {/* TODO 改成 motion 動畫 */}
      <BiBookHeart
        className={`absolute w-5 h-5 text-${
          interestedDHT[_id] ? "rose-600" : "gray-400"
        } top-2 right-8 my-btn hover:text-rose-600`}
        onClick={ckickInterested}
      />

      <HiOutlineAcademicCap
        className={`absolute top-2 right-2 text-${
          usedDHT[_id] ? "green-500" : "gray-400"
        } my-btn hover:text-green-500  ${usedDHT[_id] ? capOn : capOff}`}
        onClick={ckickUsed}
      />
      {/* card body */}
      <div className="border-b-2">
        <p className="p-2">{content}</p>
        <p className="text-right">
          <a
            href={tool.docUrl}
            className="text-xs font-bold underline text-sky-500"
          >
            Document...
          </a>
        </p>
      </div>
      {/* card footer */}
      <div>
        {/* tags */}
        {/* TODO 設計 Card 新增標籤邏輯 */}
        <div className="flex flex-wrap mt-2 text-center whitespace-nowrap">
          {tags ? (
            tags.map((tag) => (
              <Tag key={tag._id} tag={tag} Logo={deicons[tag.logo]} />
            ))
          ) : (
            <p>loading</p>
          )}
        </div>
        <CardFooterBtn tool={tool} />
      </div>
    </motion.div>
  );
};

export default Card;
