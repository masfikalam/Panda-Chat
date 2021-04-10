import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import styles from "../styles/About.module.css";

const profile = () => {
  return (
    <section>
      <Head>
        <title>Panda Chat - About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className={styles.about}>
        <div className={styles.image_box}>
          <div className={styles.version}>Panda Chat v1.0</div>
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
          <label>Key Features -</label>
          <ul>
            <li>Sign up with your google account</li>
            <li>Chat with other registered users</li>
            <li>Search your chats in the search</li>
            <li>View yours and other user's profiles</li>
            <li>Update your bio and let others know you</li>
            <li>Coming soon - change profile picture, send photos</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default profile;
