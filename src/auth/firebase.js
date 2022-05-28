import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
// import axios from "axios";
// import { URL } from "..";

const provider = new GithubAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyB7tptg5tJHB1VQVenZVDH7Cnu3BEI7fi4",
  authDomain: "fee25-toolbox.firebaseapp.com",
  projectId: "fee25-toolbox",
  storageBucket: "fee25-toolbox.appspot.com",
  messagingSenderId: "549572778754",
  appId: "1:549572778754:web:c4a1c38a2f4ed6b469801b",
  measurementId: "G-TDT2RC128V",
};
const app = initializeApp(firebaseConfig);

export { getAuth };
const auth = getAuth();

export const userSignin = async () => {
  try {
    let result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    localStorage.setItem("token", JSON.stringify(token));
    // const user = result.user;
    // await axios.post(`${URL}/api/user/auth`, { uid: user.uid });
  } catch (error) {
    console.log(error);
  }
};

export const userSignout = async () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};
