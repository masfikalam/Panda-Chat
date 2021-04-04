import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/Sidebar.module.css";
import EditIcon from "@material-ui/icons/Edit";
import { Search } from "@material-ui/icons";
import { Fab, IconButton } from "@material-ui/core";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import Header from "./Header";
import Link from "next/link";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [term, setTerm] = useState("");
  const [users, setUsers] = useState([]);
  const chatRef = db.collection("chats").where("users", "array-contains", {
    email: user.email,
    name: user.displayName,
  });
  const [chatSnapshot] = useCollection(chatRef);

  // load users
  useEffect(() => {
    const allChats = chatSnapshot?.docs.map((chat) => {
      return {
        id: chat.id,
        ...chat.data(),
      };
    });

    setUsers(allChats);
  }, []);

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

      {users &&
        // filtering data with name
        users
          .filter((chat) =>
            chat.users.find((person) =>
              person.name.toLowerCase().includes(term.toLowerCase())
            )
          )
          .map((chat) => <ChatBox key={chat.id} data={chat} styles={styles} />)}
    </aside>
  );
};

export default Sidebar;
