import React from "react";
import { FaSearch } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { userSignin, userSignout } from "../auth/firebase";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../data/user";

const Header = () => {
  const { isLogin, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <header className="px-5 border-b-2 bg-slate-50 opacity-80">
      <nav className="container relative flex flex-wrap items-center justify-between py-3">
        {/* search bar */}
        <div className="flex items-center justify-center w-full md:w-1/4">
          <div className="w-full">
            <input
              type="search"
              className="w-full h-12 px-4 py-1 text-gray-800 border-2 rounded-l-lg focus:outline-none"
              placeholder="施工中"
              x-model="search"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-r-lg"
            >
              <FaSearch />
            </button>
          </div>
        </div>
        {/* title & avatar */}
        <div className="relative flex items-center mx-auto my-3 md:mx-0">
          <h1 className="px-3 text-2xl font-bold">FEE25 大專工具箱</h1>
          <button className="px-3 text-gray-800 border-l-2">
            {isLogin ? (
              // 登入狀態 avatar
              <img className="w-8 h-8" src={user.avatar} alt="" />
            ) : (
              // 登出狀態 avatar
              <div>
                <BsGithub
                  className="w-8 h-8 my-btn"
                  onClick={() => {
                    if (!window.confirm("確定連結 Github 嗎?")) {
                      return;
                    }
                    !isLogin && userSignin();
                  }}
                />
              </div>
            )}
          </button>
          <p>{isLogin ? user.name : "遊客"}</p>
          {/* 登出登入按鈕 */}
          {isLogin && (
            <button
              onClick={() => {
                if (!window.confirm("確定登出嗎?")) {
                  return;
                }
                userSignout();
                dispatch(logout.action());
              }}
            >
              <FiLogOut className="ml-2 " />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
