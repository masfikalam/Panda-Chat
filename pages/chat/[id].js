import Head from "next/head";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import ChatHead from "../../components/ChatHead";
import styles from "../../styles/Chat.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

const Chat = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);

  // load chats
  useEffect(() => {
    setMessages([
      {
        type: "got",
        message: "Hello there!",
        time: "3:40 PM",
      },
    ]);
  }, []);

  // send message
  const sendMessage = (e) => {
    e.preventDefault();

    const form = document.getElementById("send_message");
    const newMessage = {
      type: "sent",
      message: form.message.value,
      time: "54:54 PM",
    };

    setMessages([...messages, newMessage]);
    form.reset();
  };

  return (
    <section className={styles.main_chat}>
      <Head>
        <title>Panda Chat - {user.displayName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChatHead styles={styles} userDetails={user} />

      <div className={styles.chat_area}>
        {messages.map((message, id) => (
          <p
            style={
              message.type === "got"
                ? { alignItems: "flex-start" }
                : { alignItems: "flex-end" }
            }
            key={id}
            className={styles.message_cover}
          >
            <small className={styles.time}>{message.time}</small>
            <span className={styles.message}>{message.message}</span>
          </p>
        ))}
      </div>

      <form id="send_message" className={styles.form} onSubmit={sendMessage}>
        <SentimentVerySatisfiedIcon
          style={{ color: "#17bf63", fontSize: "35px", cursor: "pointer" }}
        />
        <input
          placeholder="Type message..."
          className={styles.input}
          autoComplete="off"
          name="message"
          type="text"
          required
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
