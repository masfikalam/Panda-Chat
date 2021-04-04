import { useAuthState } from "react-firebase-hooks/auth";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import Link from "next/link";

const ChatBox = ({ data, styles }) => {
  const [user] = useAuthState(auth);
  const [details, setDetails] = useState({});
  const { email: queryEmail } = data.users.find(
    (person) => person.email !== user.email
  );

  // load that persons details
  useEffect(async () => {
    db.collection("users")
      .where("email", "==", queryEmail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setDetails({
            id: doc.id,
            ...doc.data(),
          });
        });
      });
  }, []);

  return (
    <Link href={`/${details.id}`}>
      <IconButton className={styles.cover}>
        <div className={styles.box}>
          <img
            className={styles.photo}
            src={details.photo}
            alt={details.name}
          />

          <div className={styles.text}>
            <h4 style={{ margin: "0", fontSize: "18px" }}>{details.name}</h4>
            <small style={{ color: "#17bf63" }}>4:40 PM</small>
          </div>

          <p className={styles.status}>
            <DoneAllIcon style={{ fontSize: "16px" }} />
          </p>
        </div>
      </IconButton>
    </Link>
  );
};

export default ChatBox;
