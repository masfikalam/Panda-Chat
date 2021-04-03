import { Fab } from "@material-ui/core";
import styles from "../styles/Sidebar.module.css";
import EditIcon from "@material-ui/icons/Edit";
import { Search } from "@material-ui/icons";
import { useState } from "react";
import Header from "./Header";
import Link from "next/link";

const Sidebar = () => {
  const [users, setUsers] = useState([]);

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
          autoComplete={false}
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
    </aside>
  );
};

export default Sidebar;
