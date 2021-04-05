import Head from "next/head";
import firebase from "firebase";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import Message from "../../components/Message";
import { IconButton } from "@material-ui/core";
import ChatHead from "../../components/ChatHead";
import styles from "../../styles/Chat.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { useCollection } from "react-firebase-hooks/firestore";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

const Chat = (props) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipinetDetails, setRecipientDetails] = useState({});
  const messageRef = db
    .collection("chats")
    .doc(router.query.id)
    .collection("messages")
    .orderBy("timestamp", "asc");
  const [messageSnap] = useCollection(messageRef);

  // load recipient
  useEffect(() => {
    const recipient = props.chat.users.find((rec) => rec.email !== user.email);

    db.collection("users")
      .where("email", "==", recipient.email)
      .get()
      .then((rec) => {
        rec.forEach((doc) =>
          setRecipientDetails({
            id: doc.id,
            ...doc.data(),
          })
        );
      });
  }, []);

  // load messages
  const showMessages = () => {
    if (messageSnap) {
      return messageSnap.docs.map((message) => (
        <Message
          key={message.id}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      JSON.parse(props.messages).map((message) => (
        <Message key={message.id} message={message} />
      ));
    }
  };

  // send message
  const sendMessage = (e) => {
    e.preventDefault();
    const form = document.getElementById("send_message");

    // updating last seen
    db.collection("users").doc(user.uid).set(
      {
        active: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // // sending message
    db.collection("chats").doc(router.query.id).collection("messages").add({
      user: user.displayName,
      message: form.message.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // clearing input
    form.reset();
  };

  return (
    <section className={styles.main_chat}>
      <Head>
        <title>Panda Chat - {recipinetDetails.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChatHead styles={styles} userDetails={recipinetDetails} />

      <div className={styles.chat_area}>{showMessages()}</div>

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

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  const messageRef = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messageRef.docs
    .map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    })
    .map((messages) => {
      return {
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
      };
    });

  const chatRef = await ref.get();
  const chat = {
    id: chatRef.id,
    ...chatRef.data(),
  };

  return {
    props: {
      chat,
      messages: JSON.stringify(messages),
    },
  };
}
