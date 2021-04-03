import Head from "next/head";
import Image from "next/image";
// import Panda from "../assets/panda.png";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import styles from "../styles/Login.module.css";

const Login = () => {
  // sign in in with google
  const GoogleSignin = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <section className={styles.login}>
      <Head>
        <title>Panda Chat - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="texts">
        <h1 className={styles.title}>Panda Chat</h1>
        <p className={styles.slogan}>Don't be racist, be like Panda</p>
      </div>

      <Image src="/imgs/panda.png" height={400} width={200} alt="Panda" />

      <button
        type="button"
        className={styles.login_button}
        onClick={GoogleSignin}
      >
        Sign in
      </button>
    </section>
  );
};

export default Login;
