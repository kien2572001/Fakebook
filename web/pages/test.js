import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";

import styles from "~/styles/Home.module.css";
import AuthContext from "~/contexts/AuthContext";

import { Camera } from "react-feather";

export default function Home() {
  const user = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div>Test page</div>
      <Camera color="red" size={48} />
    </div>
  );
}
