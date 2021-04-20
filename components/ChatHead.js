import { Dialog, DialogTitle, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DeleteIcon from "@material-ui/icons/Delete";
import { useRouter } from "next/router";
import TimeAgo from "timeago-react";
import { useState } from "react";
import { db } from "../firebase";
import Link from "next/link";

const ChatHead = ({ styles, userDetails, id }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // delete chat
  const deleteChat = () => {
    db.collection("chats")
      .doc(id)
      .delete()
      .then(() => router.push("/"));
  };

  return (
    <header className={styles.header}>
      <Link href={`/profile/${userDetails.id}`}>
        <div className={styles.box}>
          <img
            alt={userDetails.name}
            src={userDetails.photo}
            className={styles.photo}
          />

          <div className={styles.text}>
            <h4 style={{ margin: "0", fontSize: "18px" }}>
              {userDetails.name}
            </h4>
            {userDetails.active && (
              <small style={{ color: "#17bf63" }}>
                Last seen <TimeAgo datetime={userDetails.active.toDate()} />
              </small>
            )}
          </div>
        </div>
      </Link>

      <div className="options">
        <Link href="/">
          <IconButton className={styles.hide_back}>
            <ArrowBackIosIcon className={styles.back} />
          </IconButton>
        </Link>

        <IconButton onClick={() => setOpen(true)}>
          <DeleteIcon className={styles.back} />
        </IconButton>

        <Dialog
          onClose={() => setOpen(false)}
          aria-labelledby="delete-chat-modal"
          open={open}
        >
          <DialogTitle id="delete-chat-modal">
            Sure to delete this chat?
          </DialogTitle>

          <div className={styles.buttons_box}>
            <button
              onClick={deleteChat}
              className={styles.button}
              style={{ background: "#17bf63", color: "#15202b" }}
            >
              Yes
            </button>
            <button
              className={styles.button}
              onClick={() => setOpen(false)}
              style={{ background: "#15202b" }}
            >
              No
            </button>
          </div>
        </Dialog>
      </div>
    </header>
  );
};

export default ChatHead;
