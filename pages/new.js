import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import styles from "../styles/NewChat.module.css";
import Header from "../components/Header";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const newChat = () => {
  const [name, setname] = useState("");

  return (
    <section>
      <Head>
        <title>Panda Chat - New</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className={styles.new_chat_box}>
        <h3>Start New Chat</h3>

        <FormControl className={styles.form_control}>
          <InputLabel id="user_name-label" style={{ color: "white" }}>
            Select Recipient
          </InputLabel>

          <Select
            required
            value={name}
            id="user_name"
            labelId="user_name-label"
            className={styles.select_field}
            onChange={(e) => setname(e.target.value)}
          >
            <MenuItem className={styles.menu_item} value="Masfik">
              Masfik
            </MenuItem>
            <MenuItem className={styles.menu_item} value="Towfik">
              Towfik
            </MenuItem>
            <MenuItem className={styles.menu_item} value="Ahnaf">
              Ahnaf
            </MenuItem>
          </Select>
        </FormControl>

        {name !== "" && (
          <Link href={`/${name}`}>
            <Button
              type="submit"
              variant="outlined"
              onClick={() => console.log(name)}
              className={styles.start_btn}
            >
              Start <DoubleArrowIcon />
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default newChat;
