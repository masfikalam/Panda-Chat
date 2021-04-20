import { auth } from "../../firebase";
import Header from "../../components/Header";
import HeadTag from "../../components/HeadTag";
import BioText from "../../components/BioText";
import styles from "../../styles/Profile.module.css";
import { useAuthState } from "react-firebase-hooks/auth";

const profile = () => {
  const [user] = useAuthState(auth);

  return (
    <section id="profile">
      <HeadTag page="Profile" />

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
          Details are shown based on your Google account.
        </p>
      </div>
    </section>
  );
};

export default profile;
