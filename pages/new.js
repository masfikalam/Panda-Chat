import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/NewChat.module.css";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { auth, db } from "../firebase";
import Head from "next/head";
import Link from "next/link";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const newChat = () => {
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState({});
  const chatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(chatRef);

  // const loading all users
  useEffect(async () => {
    const snapshot = await db.collection("users").get();
    const allUsers = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    const otherUsers = allUsers.filter((others) => others.email !== user.email);

    setUsers(otherUsers);
  }, []);

  // check if already exists
  const alreadyExists = (email) => {
    const bool = !!chatSnapshot?.docs.find(
      (chat) => chat.data().users.find((user) => user === email)?.length > 0
    );

    return bool;
  };

  // create chat
  const createChat = (obj) => {
    if (!alreadyExists(obj.email)) {
      db.collection("chats").add({
        users: [user.email, obj.email],
      });
    }
  };

  return (
    <section>
      <Head>
        <title>Panda Chat - New</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className={styles.new_chat_box}>
        <h3>Start New Chat</h3>

        {users.length > 0 ? (
          <FormControl className={styles.form_control}>
            <InputLabel id="user_name-label" style={{ color: "white" }}>
              Select Recipient
            </InputLabel>

            <Select
              required
              value={chat.name ? chat.name : ""}
              id="user_name"
              labelId="user_name-label"
              className={styles.select_field}
            >
              {users.map((user) => (
                <MenuItem
                  key={user.id}
                  className={styles.menu_item}
                  value={user.name}
                  onClick={() => setChat(user)}
                >
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <p style={{ color: "#17bf63", marginTop: "30px" }}>
            Sorry! You are the only user till now.
          </p>
        )}

        {chat.id && (
          // <Link href={`/${chat.id}`}>
          <Button
            type="submit"
            variant="outlined"
            onClick={() => createChat(chat)}
            className={styles.start_btn}
          >
            Start <DoubleArrowIcon />
          </Button>
          // </Link>
        )}
      </div>
    </section>
  );
};

export default newChat;
