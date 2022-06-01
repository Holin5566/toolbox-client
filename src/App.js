import "./App.css";
import Header from "./Layout/Header";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { login } from "./data/user";
import { setTools } from "./data/tool";
import axios from "axios";
import { URL } from ".";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(getAuth(), async (user) => {
    // firebase auth 驗證失敗
    if (!user) return console.log("anonymous user");

    // firebase auth 驗證成功
    const { uid, email, photoURL } = user;
    // NOTE 註冊會員
    try {
      const { data } = await axios.get(`${URL}/api/user?uid=${uid}`);
      if (!data) {
        // user不存在，製作user
        const post = {
          uid,
          name: email,
          email,
          avatar: photoURL,
        };
        await axios.post(`${URL}/api/user`, post);
        dispatch(login.action({ user, interestedDHT: {}, usedDHT: {} }));
      } else {
        // user存在
        user = data;
        const usedDHT = {};
        data.used.forEach((item) => {
          usedDHT[item.toString()] = "exist";
        });
        const interestedDHT = {};
        data.interested.forEach((item) => {
          interestedDHT[item.toString()] = "exist";
        });
        dispatch(login.action({ user, usedDHT, interestedDHT }));
      }
    } catch (e) {
      console.log(e);
    }
  });

  // NOTE 載入工具列表 / Cards
  useEffect(() => {
    axios
      .get(`${URL}/api/tool`)
      .then(({ data: tools }) => {
        dispatch(setTools.action(tools));
      })
      .catch((e) => console.log(e));
  }, [dispatch]);
  // TODO 設計RWD
  return (
    <div className="relative text-gray-700 bg-slate-100 App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
