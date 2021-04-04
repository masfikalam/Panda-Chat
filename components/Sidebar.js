import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/Sidebar.module.css";
import EditIcon from "@material-ui/icons/Edit";
import { useEffect, useState } from "react";
import { Search } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import { auth, db } from "../firebase";
import ChatBox from "./ChatBox";
import Header from "./Header";
import Link from "next/link";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [term, setTerm] = useState("");
  // const [users, setUsers] = useState([]);

  // loading user data
  const chatRef = db.collection("chats").where("users", "array-contains", {
    email: user.email,
    name: user.displayName,
  });
  const [chatSnapshot] = useCollection(chatRef);
  const users = chatSnapshot?.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return (
    <aside>
      <Header />

      <div className={styles.search}>
        <input
          name="term"
          type="text"
          autoComplete="off"
          placeholder="Search People..."
          className={styles.search_field}
          onChange={(e) => setTerm(e.target.value)}
        />

        <Search style={{ color: "white", fontSize: "25px" }} />
      </div>

      <div className={styles.new_chat}>
        <Link href="/new">
          <Fab className={styles.chat_icon} aria-label="edit">
            <EditIcon />
          </Fab>
        </Link>
      </div>

      {users ? (
        users
          .filter((chat) =>
            chat.users.find((person) =>
              person.name.toLowerCase().includes(term.toLowerCase())
            )
          )
          .map((chat) => <ChatBox key={chat.id} data={chat} styles={styles} />)
      ) : (
        <p style={{ textAlign: "center", marginTop: "50px", color: "#17bf63" }}>
          Loading Chats...
        </p>
      )}
    </aside>
  );
};

export default Sidebar;
