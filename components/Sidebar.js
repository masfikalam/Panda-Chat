import { Fab } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import Link from "next/link";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import styles from "../styles/Sidebar.module.css";
import AllChats from "./AllChats";
import Header from "./Header";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [term, setTerm] = useState("");

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

      <div className={styles.all_chats}>
        <AllChats styles={styles} users={users} term={term} />
      </div>

      <div className={styles.new_chat}>
        <Link href="/new">
          <Fab className={styles.chat_icon} aria-label="edit">
            <EditIcon />
          </Fab>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
