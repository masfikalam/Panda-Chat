import Login from "./login";
import "../styles/globals.css";
import firebase from "firebase/";
import { useEffect } from "react";
import { auth, db } from "../firebase";
import Loading from "../components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  // save user info
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
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
