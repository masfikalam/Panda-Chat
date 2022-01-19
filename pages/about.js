import Image from "next/image";
import Header from "../components/Header";
import HeadTag from "../components/HeadTag";
import styles from "../styles/About.module.css";

const profile = () => {
  return (
    <section>
      <HeadTag page="About" />

      <Header />
      <div className={styles.about}>
        <div className={styles.image_box}>
          <div className={styles.version}>Panda Chat v1.3</div>
          <Image
            className={styles.photo}
            src="/imgs/about1.png"
            width={300}
            height={250}
            alt="Panda"
          />
          <p>A simple chat application made for fun.</p>
        </div>

        <div className={styles.features}>
          <span style={{ color: "#17bf63" }}>Key Features -</span>
          <ul className={styles.list}>
            <li>Sign up with your google account</li>
            <li>Chat with other registered users</li>
            <li>Search your chats in the search bar</li>
            <li>View yours and other user's profiles</li>
            <li>Update bio and let others know you</li>
          </ul>
        </div>

        <div className={styles.features}>
          <span style={{ color: "#17bf63" }}>Coming soon -</span>
          <ul className={styles.list}>
            <li>Message notifications</li>
            <li>Change profile picture</li>
            <li>Send photos and files</li>
          </ul>
        </div>

        <div className={styles.features}>
          <span style={{ color: "#17bf63" }}>Tech Stack -</span>
          <ul className={styles.list}>
            <li>Next JS, JavaScript</li>
            <li>Moment JS, Material UI</li>
            <li>Firebase Auth, Firestore</li>
            <li>HTML, CSS, CSS Modules</li>
          </ul>
        </div>

        <div className={styles.features}>
          <span style={{ color: "#17bf63" }}>Developer -</span>
          <div style={{ paddingLeft: "20px" }}>
            <h3 style={{ marginBottom: "5px" }}>Masfik Alam</h3>
            <p style={{ margin: "0" }}>
              Contact - <a href="mailto:masfikalamfrp@gmail.com">Email</a>
              {" / "}
              <a href="https://linkedin.com/in/masfik-alam" target="_blank">
                Linkedin
              </a>
              {" / "}
              <a href="https://masfikul-alam.web.app" target="_blank">
                Web
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default profile;
