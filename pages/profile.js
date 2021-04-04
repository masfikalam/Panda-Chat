import { auth } from "../firebase";
import Header from "../components/Header";
import styles from "../styles/Profile.module.css";
import { useAuthState } from "react-firebase-hooks/auth";

const profile = () => {
  const [user] = useAuthState(auth);

  return (
    <section id="profile">
      <Header />

      <div className={styles.profile}>
        <img
          className={styles.photo}
          src={user.photoURL}
          alt={user.displayName}
        />

        <h2>{user.displayName}</h2>
        <p className={styles.active}>Active now</p>
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