import Head from "next/head";
import Image from "next/image";
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
        onClick={GoogleSignin}
        className={styles.login_button}
      >
        Sign in
      </button>

      <small style={{ color: "white" }}>
        <a href="https://masfikul-alam.web.app/" target="_blank">
          Masfik
        </a>{" "}
        &copy; {new Date().getFullYear()}
      </small>
    </section>
  );
};

export default Login;
