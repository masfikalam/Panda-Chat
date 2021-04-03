import Link from "next/link";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styles from "../styles/Sidebar.module.css";
import FaceIcon from "@material-ui/icons/Face";
import { useState } from "react";
import { auth } from "../firebase";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // sign out from google account
  const googleSignOut = () => {
    auth.signOut().catch(alert);
  };

  return (
    <header className={styles.sidebar}>
      <div className={styles.title}>
        <Link href="/">
          <h5 style={{ margin: "0", fontSize: "22px" }}>Panda Chat</h5>
        </Link>
      </div>

      <div className="more">
        <Link href="/new">
          <IconButton
            style={{
              fontSize: "30px",
              cursor: "pointer",
              color: "#00028a",
            }}
          >
            <PersonAddIcon />
          </IconButton>
        </Link>

        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          style={{
            fontSize: "30px",
            cursor: "pointer",
            color: "#00028a",
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </div>

      <Menu
        keepMounted
        id="more-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem className={styles.menu_item}>
          <Link href="/profile">
            <span className={styles.menu_text}>
              <FaceIcon style={{ marginRight: "10px" }} />
              Profile
            </span>
          </Link>
        </MenuItem>
        <MenuItem onClick={googleSignOut} className={styles.menu_item}>
          <span className={styles.menu_text}>
            <ExitToAppIcon style={{ marginRight: "10px" }} />
            Logout
          </span>
        </MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
