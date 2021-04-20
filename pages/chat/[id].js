import firebase from "firebase";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase";
import HeadTag from "../../components/HeadTag";
import Message from "../../components/Message";
import { IconButton } from "@material-ui/core";
import ChatHead from "../../components/ChatHead";
import styles from "../../styles/Chat.module.css";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { useCollection } from "react-firebase-hooks/firestore";

const Chat = (props) => {
  const router = useRouter();
  const scrollDown = useRef(null);
  const [user] = useAuthState(auth);
  const [recipinetDetails, setRecipientDetails] = useState({});
  const messageRef = db
    .collection("chats")
    .doc(router.query.id)
    .collection("messages")
    .orderBy("timestamp", "asc");
  const [messageSnap] = useCollection(messageRef);

  // scroll down
  const pleaseScroll = () => {
    scrollDown.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      <HeadTag page={recipinetDetails.name} />

      <ChatHead
        styles={styles}
        id={router.query.id}
        userDetails={recipinetDetails}
      />

      <div className={styles.chat_area}>
        <p className={styles.hello}>Start chat with {recipinetDetails.name}</p>
        {showMessages()}
        <div className={styles.scroller} ref={scrollDown} />
        {pleaseScroll()}
      </div>

      <form id="send_message" className={styles.form} onSubmit={sendMessage}>
        <input
          placeholder="Type message..."
          className={styles.input}
          autoComplete="off"
          name="message"
          type="text"
          required
        />
        <IconButton type="submit" style={{ padding: "0", margin: 0 }}>
          <DoubleArrowIcon className={styles.send} />
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
