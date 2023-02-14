import MainLayout from "~/components/layouts/MainLayout";
import MyGroup from "~/components/group/MyGroup";

import { parserUserCookies } from "~/ultis/parser";
import axios from "axios";
export async function getServerSideProps(context) {
  const userCookie = context.req.cookies.user;
  // console.log('user', userCookie)
  if (!userCookie) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  const userData = parserUserCookies(context.req.cookies);

  let groupData = null;
  try {
    const id = context.params.id;
    const response = await axios.get(
      `${process.env.SERVER_API_HOST}/api/groups/${id}`,
      {
        params: {
          user_id: userData.id,
        },
        withCredentials: true,
        headers: {
          Cookie: context.req.cookies,
        },
      }
    );
    groupData = response.data.data;
    if (typeof groupData.members === "object") {
      groupData.members = Object.values(groupData.members);
    }
  } catch (error) {
    console.log("error", error);
  }

  return {
    props: {
      userData: userData,
       groupData: groupData,
    },
  };
}

export default function groups({ userData, groupData }) {
  return (
    <MainLayout userData={userData}>
      <MyGroup userData={userData} groupData={groupData} />
    </MainLayout>
  );
}
