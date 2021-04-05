import { auth } from "../../firebase";
import ChatHead from "../../components/ChatHead";
import styles from "../../styles/Chat.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { IconButton } from "@material-ui/core";

const Chat = () => {
  const [user] = useAuthState(auth);

  // send message
  const sendMessage = (e) => {
    e.preventDefault();

    const form = document.getElementById("send_message");
    console.log(form.message.value);

    form.reset();
  };

  return (
    <section className="chat">
      <ChatHead styles={styles} userDetails={user} />

      <div className="chat_area"></div>

      <form id="send_message" className={styles.form} onSubmit={sendMessage}>
        <SentimentVerySatisfiedIcon
          style={{ color: "#17bf63", fontSize: "35px", cursor: "pointer" }}
        />
        <input
          placeholder="Type message..."
          autoComplete="off"
          type="text"
          className={styles.input}
          name="message"
        />
        <IconButton type="submit" style={{ padding: "0", margin: 0 }}>
          <DoubleArrowIcon
            style={{ color: "#17bf63", fontSize: "40px", cursor: "pointer" }}
          />
        </IconButton>
      </form>
    </section>
  );
};

export default Chat;
