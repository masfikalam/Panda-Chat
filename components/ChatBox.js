import { useAuthState } from "react-firebase-hooks/auth";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import Link from "next/link";

const ChatBox = ({ id, data, styles }) => {
  const [user] = useAuthState(auth);
  const [details, setDetails] = useState({});
  const queryEmail = data.users.find((email) => email !== user.email);

  // load that persons details
  useEffect(async () => {
    db.collection("users")
      .where("email", "==", queryEmail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setDetails(doc.data());
        });
      });
  }, []);

  return (
    <IconButton className={styles.cover}>
      <Link href={`/${id}`}>
        <div className={styles.box}>
          <img
            className={styles.photo}
            src={details.photo}
            alt={details.name}
          />

          <div className={styles.text}>
            <h4 style={{ margin: "0", fontSize: "18px" }}>{details.name}</h4>
            <small style={{ color: "#17bf63" }}>active 50 seconds ago</small>
          </div>

          <p className={styles.status}>
            <DoneAllIcon style={{ fontSize: "16px" }} />
          </p>
        </div>
      </Link>
    </IconButton>
  );
};

export default ChatBox;
