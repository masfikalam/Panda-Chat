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

      <div className="options">
        <Link href="/">
          <IconButton>
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
              style={{ background: "#17bf63" }}
              className={styles.button}
            >
              Yes
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "#15202b" }}
              className={styles.button}
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
