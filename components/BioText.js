import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { db } from "../firebase";

const BioText = ({ styles, user }) => {
  const [bioText, setBioText] = useState("");
  const [toggle, setToggle] = useState(false);

  // load user summary
  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => setBioText(doc.data().bio));
  }, [user]);

  // change summary
  const changeSummary = (e) => {
    e.preventDefault();

    const form = document.getElementById("summary_form");
    const summary = form.summary.value;

    db.collection("users")
      .doc(user.uid)
      .set(
        {
          bio: summary,
        },
        { merge: true }
      )
      .then(() => {
        setBioText(summary);
        setToggle(false);
      });
  };

  return (
    <>
      <table
        style={{
          textAlign: "left",
          padding: "20px",
        }}
      >
        <tbody>
          <tr>
            <td>Status</td>
            <td>:&nbsp;</td>
            <td className={styles.active}>Active Now</td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>:&nbsp;</td>
            <td>{user.email}</td>
          </tr>
          <tr style={{ verticalAlign: "top", padding: "30px" }}>
            <td>Summary &nbsp;</td>
            <td>:&nbsp;</td>
            <td>{bioText}</td>
          </tr>
        </tbody>
      </table>

      {toggle ? (
        <form id="summary_form" onSubmit={changeSummary}>
          <textarea
            placeholder="Profile summary"
            className={styles.input}
            defaultValue={bioText}
            autoComplete="off"
            name="summary"
            maxLength="30"
            autoFocus
            required
            rows="2"
          ></textarea>
          <Button type="submit" variant="outlined" className={styles.edit_bio}>
            Save
          </Button>
        </form>
      ) : (
        <Button
          variant="outlined"
          className={styles.edit_bio}
          onClick={() => setToggle(true)}
        >
          <Edit style={{ color: "#15202b", marginRight: "5px" }} /> Edit
        </Button>
      )}
    </>
  );
};

export default BioText;
