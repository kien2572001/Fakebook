import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect,useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import styles from "~/styles/Home.module.css";
import AuthContext from "~/contexts/AuthContext";

import { Camera } from "react-feather";
import axios from "~/api/axios";

export default function Home() {
  const user = useContext(AuthContext);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/users/mentions-list", {
        params: {
          range: "all",
          name: "Manh NGuyen",
        },
      });
      console.log("res: ", res);
    };
    fetchUser();
  }, []);

  const data = [
    {
      id: "1",
      display: "Manh Nguyen",
    },
    {
      id: "2",
      display: "Long Nguyen",
    },
    {
      id: "3",
      display: "Viet Nguyen",
    },
  ];

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState(data);
  const onChange = (event, newValue, newPlainTextValue, mentions) => {
    setValue(newValue);
  };
  return (
    <div className={styles.container}>
      <div>Test page</div>
      <Camera color="red" size={48} />
      <MentionsInput
        value={value}
        onChange={onChange}
        placeholder={"Type @ to mention someone"}
      >
        <Mention
          trigger="@"
          data={suggestions}
          renderSuggestion={(
            suggestion,
            search,
            highlightedDisplay,
            index,
            focused
          ) => (
            <div className={focused ? "focused" : ""}>{highlightedDisplay}</div>
          )}
        />
      </MentionsInput>
    </div>
  );
}
