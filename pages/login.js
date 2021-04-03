import Link from "next/link";
import Head from "next/head";
import { Button } from "@material-ui/core";
import styles from "../styles/Login.module.css";
import { auth, provider } from "../firebase";

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

      <div className={styles.title}>
        <Link href="/">
          <h5 style={{ margin: "0", fontSize: "22px" }}>Panda Chat</h5>
        </Link>
      </div>

      <div className={styles.login_button}>
        <h3>Sign in with Google</h3>
        <Button onClick={GoogleSignin} variant="outlined" color="primary">
          Sign in
        </Button>
      </div>
    </section>
  );
};

export default Login;
