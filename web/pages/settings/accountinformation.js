import AccountInformation from "~/components/user/AccountInformation";
import axios from "axios";
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
  const id = JSON.parse(userCookie).id;
  let userData = null;
  try {
    const response = await axios.get(
      `${process.env.SERVER_API_HOST}/api/users/${id}`
    );
    userData = response.data?.data;
  } catch (error) {
    //console.log(error);
  }

  return {
    props: {
      userData: userData,
    },
  };
}

export default function accountinformation({ userData }) {
  return <AccountInformation userData={userData} />;
}
