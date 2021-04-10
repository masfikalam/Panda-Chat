import { IconButton, Menu, MenuItem } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styles from "../styles/Header.module.css";
import FaceIcon from "@material-ui/icons/Face";
import { auth } from "../firebase";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // sign out from google account
  const googleSignOut = () => {
    auth.signOut().catch(alert);
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <h5 className={styles.title}>Panda Chat</h5>
      </Link>

      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon className={styles.dots} />
      </IconButton>

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

        <MenuItem className={styles.menu_item}>
          <Link href="/about">
            <span className={styles.menu_text}>
              <InfoOutlinedIcon style={{ marginRight: "10px" }} />
              About
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
