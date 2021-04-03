import { Input, Menu, MenuItem } from "@material-ui/core";
import styles from "../styles/Sidebar.module.css";
import { useState } from "react";
import Header from "./Header";

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
        <Input
          type="text"
          placeholder="Search users"
          className={styles.search_field}
          onChange={(e) => filterNames(e.target.value)}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
