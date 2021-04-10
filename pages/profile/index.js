import Head from "next/head";
import { auth } from "../../firebase";
import Header from "../../components/Header";
import BioText from "../../components/BioText";
import styles from "../../styles/Profile.module.css";
import { useAuthState } from "react-firebase-hooks/auth";

const profile = () => {
  const [user] = useAuthState(auth);

  return (
    <section id="profile">
      <Head>
        <title>Panda Chat - Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className={styles.profile}>
        <img
          className={styles.photo}
          src={user.photoURL}
          alt={user.displayName}
        />

        <h2>{user.displayName}</h2>

        <BioText styles={styles} user={user} />

        <p className={styles.bottom}>
          Details are shown based on your Google account. <br /> <br />
          <a href="https://masfikul-alam.web.app/" target="_blank">
            Masfik
          </a>{" "}
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};

export default profile;
