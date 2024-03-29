import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useLayoutEffect } from "react";

import styles from "~/styles/Home.module.css";
import AuthContext from "~/contexts/AuthContext";
import MainLayout from "~/components/layouts/MainLayout";

import ListPost from "~/components/layouts/ListPost";
import axios from "~/api/axios";

import { useDispatch } from "react-redux";
import { setUser } from "~/store/userSlice";
import { parserUserCookies } from "~/ultis/parser";

export async function getServerSideProps(context) {
  const userCookie = context.req.cookies.user;

  if (!userCookie) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  //const id = JSON.parse(userCookie).id;
  const userData = parserUserCookies(context.req.cookies);
  // try {
  //   const response = await axios.get(
  //     // `${process.env.SERVER_API_HOST}/api/users/${id}}`
  //     `${process.env.SERVER_API_HOST}/api/users/${id}`
  //   );
  //   userData = response.data?.data;
  // } catch (error) {
  //   //console.log(error);
  // }

  return {
    props: {
      userData: userData,
    },
  };
}

export default function Index({ userData }) {

  return (
    <MainLayout userData={userData} >
      <ListPost userData={userData} />
    </MainLayout>
  );
}
