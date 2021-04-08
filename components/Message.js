import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/Chat.module.css";
import { auth } from "../firebase";
import moment from "moment";

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
      {message.timestamp && (
        <small className={styles.time}>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </small>
      )}
      <span className={styles.message}>{message.message}</span>
    </p>
  );
};

export default Message;
