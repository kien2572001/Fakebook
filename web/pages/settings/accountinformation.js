import AccountInformation from "~/components/user/AccountInformation";
import axios from "axios";
import { parserUserCookies } from "~/ultis/parser";
//ssr
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

export default function accountinformation({ userData }) {
  return <AccountInformation userData={userData} />;
}
