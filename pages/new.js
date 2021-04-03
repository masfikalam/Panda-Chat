import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import styles from "../styles/Sidebar.module.css";
import Header from "../components/Header";
import { useState } from "react";
import Head from "next/head";

const newChat = () => {
  const [name, setname] = useState("");

  // start new chat
  const startNewChat = (e) => {
    e.preventDefault();

    console.log(name);
  };

  return (
    <section>
      <Head>
        <title>Panda Chat - New</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <form onSubmit={startNewChat} className={styles.new_chat}>
        <h3>Start New Chat</h3>
        <FormControl className={styles.form_control}>
          <InputLabel id="user_name-label">Name</InputLabel>
          <Select
            required
            value={name}
            id="user_name"
            labelId="user_name-label"
            onChange={(e) => setname(e.target.value)}
          >
            <MenuItem value="Masfik">Masfik</MenuItem>
            <MenuItem value="Towfik">Towfik</MenuItem>
            <MenuItem value="Ahnaf">Ahnaf</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          style={{ marginTop: "50px" }}
        >
          Chat
        </Button>
      </form>
    </section>
  );
};

export default newChat;
