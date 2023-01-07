import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";

import styles from "~/styles/Home.module.css";
import AuthContext from "~/contexts/AuthContext";
import MainLayout from "~/components/layouts/MainLayout";

import ListPost from "~/components/layouts/ListPost";
import NotFound from "~/components/layouts/NotFound";

export default function Index() {
  const user = useContext(AuthContext);

  return (
    <MainLayout>
      <NotFound />
    </MainLayout>  
  );
}
