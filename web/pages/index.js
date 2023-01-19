import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";

import styles from "~/styles/Home.module.css";
import AuthContext from "~/contexts/AuthContext";
import MainLayout from "~/components/layouts/MainLayout";

import ListPost from "~/components/layouts/ListPost";

export default function Index() {

  return (
    <MainLayout>
      <ListPost />
    </MainLayout>
  );
}
