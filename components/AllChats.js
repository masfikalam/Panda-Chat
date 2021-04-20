import React from "react";
import ChatBox from "./ChatBox";

const AllChats = ({ term, styles, users }) => {
  const altStyle = { textAlign: "center", marginTop: "50px", color: "#17bf63" };

  return users ? (
    users.length > 0 ? (
      users
        .filter((chat) =>
          chat.users.find((person) =>
            person.name.toLowerCase().includes(term.toLowerCase())
          )
        )
        .map((chat, id) => (
          <div key={id}>
            <ChatBox data={chat} styles={styles} />
          </div>
        ))
    ) : (
      <p
        style={{
          ...altStyle,
          lineHeight: "20px",
        }}
      >
        To start a new chat, <br />
        Click on the pen icon below
      </p>
    )
  ) : (
    <p style={altStyle}>Loading Chats...</p>
  );
};

export default AllChats;
