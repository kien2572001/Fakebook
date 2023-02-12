import { useContext, useEffect, useState } from "react";
import { parserUserCookies } from "~/ultis/parser";
import {
  ExternalLink,
  Eye,
  Lock,
  Mail,
  MapPin,
  MoreHorizontal,
  Users,
} from "react-feather";
import MainLayout from "~/components/layouts/MainLayout";
import AuthContext from "~/contexts/AuthContext";
import ListPost from "~/components/layouts/ListPost";
import axios from "~/api/axios";
import { Button, Dropdown, Menu, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Image } from "antd";
import Profile from "~/components/user/Profile";
export async function getServerSideProps(context) {
  const userData = parserUserCookies(context.req.cookies);
  if (!userData) {
    return {
      redirect: {
        destination: "auth/login",
        permanent: false,
      },
    };
  }

  const userId = context.params.userId;
  let thisProfileUser = null;
  let checkFriend = "false";
  if (userId !== userData.id) {
    try {
      const response = await axios.get(
        `${process.env.SERVER_API_HOST}/api/users/${userId}/information`
      );
      thisProfileUser = response.data?.data;
    } catch (error) {
      //console.log(error);
    }
  } else {
    thisProfileUser = userData;
  }

  return {
    props: {
      userData: userData,
      thisProfileUser: thisProfileUser,
    },
  };
}

export default function profile({ userData, thisProfileUser }) {
  return (
    <MainLayout userData={userData}>
      <Profile userData={userData} thisProfileUser={thisProfileUser} />
    </MainLayout>
  );
}
