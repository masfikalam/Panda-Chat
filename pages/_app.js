import firebase from "firebase/";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";
import { auth, db } from "../firebase";
import "../styles/globals.css";
import Login from "./login";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  // save user info
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          photo: user.photoURL,
          name: user.displayName,
          active: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }
  }, [user]);

  // rendering based on login status
  if (loading) {
    return <Loading />;
  } else if (user) {
    return <Component {...pageProps} />;
  } else {
    return <Login />;
  }
}

export default MyApp;
