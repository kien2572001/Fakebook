import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";

import styles from "~/styles/Home.module.css";
import AuthContext from "~/contexts/AuthContext";
import MainLayout from "~/components/layouts/MainLayout";

export default function Index() {
  const user = useContext(AuthContext);

  return (
    <MainLayout>
      <div> Hello</div>
    </MainLayout>
  );
}
