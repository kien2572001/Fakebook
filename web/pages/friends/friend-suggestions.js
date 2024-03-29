import FriendSuggestions from "~/components/friends/FriendSuggestions";
import MainLayout from "~/components/layouts/MainLayout";
import { parserUserCookies } from "~/ultis/parser";

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
  
    return {
      props: {
        userData: userData,
      },
    };
  }

export default function Index({ userData }) {
    return (
      <MainLayout userData={userData}>
        <FriendSuggestions userData={userData} />
      </MainLayout>
    );
  }