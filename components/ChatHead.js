import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import { IconButton } from "@material-ui/core";
import TimeAgo from "timeago-react";
import Link from "next/link";

const ChatHead = ({ styles, userDetails }) => {
  return (
    <header className={styles.header}>
      <div className={styles.box}>
        <img
          className={styles.photo}
          src={userDetails.photo}
          alt={userDetails.name}
        />

        <div className={styles.text}>
          <h4 style={{ margin: "0", fontSize: "18px" }}>{userDetails.name}</h4>
          {userDetails.active && (
            <small style={{ color: "#17bf63" }}>
              Last seen <TimeAgo datetime={userDetails.active.toDate()} />
            </small>
          )}
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
