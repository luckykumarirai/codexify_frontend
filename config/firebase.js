import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUAsf5otChSK--oCci5Wmq8SrQc4UqL5w",
  authDomain: "codex-a4e2d.firebaseapp.com",
  projectId: "codex-a4e2d",
  storageBucket: "codex-a4e2d.appspot.com",
  messagingSenderId: "695891366521",
  appId: "1:695891366521:web:c90ea4655e5f340954baa8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const storage = getStorage(app);
