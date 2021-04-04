import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/Sidebar.module.css";
import EditIcon from "@material-ui/icons/Edit";
import { Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Fab } from "@material-ui/core";
import { auth, db } from "../firebase";
import Header from "./Header";
import Link from "next/link";
import ChatBox from "./ChatBox";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const chatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(chatRef);

  // filter names for search
  const filterNames = (term) => {
    const results = users.filter((data) =>
      data.name.toLowerCase().includes(term.toLowerCase())
    );

    setUsers(results);
  };

  return (
    <aside>
      <Header />

      <div className={styles.search}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search users"
          className={styles.search_field}
          onChange={(e) => filterNames(e.target.value)}
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

      {chatSnapshot?.docs.map((chat) => (
        <ChatBox key={chat.id} id={chat.id} data={chat.data()} />
      ))}
    </aside>
  );
};

export default Sidebar;
