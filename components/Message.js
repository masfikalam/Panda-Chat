import styles from "../styles/Chat.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <p
      style={
        message.user === user.displayName
          ? { alignItems: "flex-end" }
          : { alignItems: "flex-start" }
      }
      className={styles.message_cover}
    >
      <small className={styles.time}>{message.timestamp}</small>
      <span className={styles.message}>{message.message}</span>
    </p>
  );
};

export default Message;
