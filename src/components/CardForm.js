import axios from "axios";
import React, { useRef } from "react";
import { MdPhoto } from "react-icons/md";
import { useDispatch } from "react-redux";
import { URL } from "..";
import { setTools } from "../data/tool";

const FormAddTool = ({ setOpen }) => {
  const nameRef = useRef();
  const urlRef = useRef();
  const contentRef = useRef();
  const dispatch = useDispatch();

  // NOTE event function
  const handleSubmit = async () => {
    const name = nameRef.current.value;
    const docUrl = urlRef.current.value;
    const content = contentRef.current.value;
    if (!name || !docUrl || !content) {
      return alert("無效輸入");
    }
    //防呆
    if (
      !window.confirm(
        `新增工具  \n名稱 : ${name}\n文檔 : ${docUrl}\n介紹 : ${content}`
      )
    )
      return;
    try {
      const post = { name, docUrl, content };
      const { data } = await axios.post(`${URL}/api/tool`, post);
      window.alert(data.msg);

      const { data: tools } = await axios.get(`${URL}/api/tool`);
      dispatch(setTools.action(tools));
      nameRef.current.value = null;
      urlRef.current.value = null;
      contentRef.current.value = null;
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-5 m-auto bg-white border-2 w-96">
      <h3 className="w-40 text-2xl font-bold border-b-2">新增工具</h3>
      {/* NOTE form */}
      <div className="col-span-2 p-3">
        <div className="grid grid-cols-4 gap-5 py-3">
          <div className="col-span-1 text-right">名稱</div>
          <div className="col-span-3">
            <input
              type="text"
              className="border"
              ref={nameRef}
              placeholder="輸入名稱"
            />
          </div>
          <div className="col-span-1 text-right">文檔</div>
          <div className="col-span-3">
            <input
              type="text"
              className="border"
              ref={urlRef}
              placeholder="https://"
            />
          </div>
          <div className="col-span-1 text-right">簡介</div>
          <div className="col-span-3">
            <textarea
              className="border"
              rows="3"
              placeholder="簡單介紹 (0/150)"
              ref={contentRef}
            />
          </div>
        </div>
        {/* NOTE tool logo */}
        <div className="absolute top-0 p-1 -translate-x-1/2 -translate-y-1/2 border-2 rounded-full left-1/2 bg-slate-500">
          <MdPhoto className="w-20 h-20 text-white" />
        </div>
      </div>
      <div className="text-right">
        <button
          className="px-2 py-1 font-bold text-white rounded bg-slate-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormAddTool;
