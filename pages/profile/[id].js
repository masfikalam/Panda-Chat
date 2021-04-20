import Head from "next/head";
import { db } from "../../firebase";
import TimeAgo from "timeago-react";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ChatIcon from "@material-ui/icons/Chat";
import styles from "../../styles/Profile.module.css";

const profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({});

  // load user info
  useEffect(() => {
    db.collection("users")
      .doc(router.query.id)
      .get()
      .then((doc) => setUser(doc.data()));
  }, []);

  return (
    <section id="profile">
      <Head>
        <title>Panda Chat - Profile</title>
        <link rel="icon" href="/logo.ico" />
      </Head>

      <Header />

      <div className={styles.profile}>
        <img className={styles.photo} src={user?.photo} alt={user.name} />

        <h2>{user.name}</h2>

        <table
          style={{
            textAlign: "left",
            padding: "20px",
          }}
        >
          <tbody>
            <tr>
              <td>Active</td>
              <td>:&nbsp;</td>
              <td className={styles.active}>
                <TimeAgo datetime={user.active?.toDate()} />
              </td>
            </tr>
            <tr>
              <td>Contact</td>
              <td>:&nbsp;</td>
              <td>{user.email}</td>
            </tr>
            <tr style={{ verticalAlign: "top", padding: "30px" }}>
              <td>Summary &nbsp;</td>
              <td>:&nbsp;</td>
              <td>{user.bio ? user.bio : "..."}</td>
            </tr>
          </tbody>
        </table>

        <Button
          variant="outlined"
          className={styles.edit_bio}
          onClick={() => router.back()}
        >
          <ChatIcon style={{ color: "#15202b", marginRight: "5px" }} /> Message
        </Button>

        <p className={styles.bottom}>
          Details are shown based on Google account. <br /> <br />
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
