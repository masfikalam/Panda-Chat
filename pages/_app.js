import "../styles/globals.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  // rendering based on login status
  if (loading) {
    return <Loading />;
  } else if (user) {
    return <Component {...pageProps} />;
  } else {
    return <Login />;
  }

  // return <Component {...pageProps} />;
}

export default MyApp;
