import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import { IconButton } from "@material-ui/core";
import Link from "next/link";

const ChatHead = ({ styles, userDetails }) => {
  return (
    <header className={styles.header}>
      <div className={styles.box}>
        <img
          className={styles.photo}
          src={userDetails.photoURL}
          alt={userDetails.displayName}
        />

        <div className={styles.text}>
          <h4 style={{ margin: "0", fontSize: "18px" }}>
            {userDetails.displayName}
          </h4>
          <small style={{ color: "#17bf63" }}>4:40 PM</small>
        </div>
      </div>

      <Link href="/">
        <IconButton>
          <KeyboardTabIcon className={styles.back} />
        </IconButton>
      </Link>
    </header>
  );
};

export default ChatHead;
