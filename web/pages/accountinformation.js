import AccountInformation from "~/components/user/AccountInformation";
import axios from "axios";

//ssr
export async function getServerSideProps(context) {
  const userCookie = JSON.parse(context.req.cookies.user);
  // console.log('user', userCookie)
  const id = userCookie.id;
  let userData = null;
  try {
    const response = await axios.get(
      // `${process.env.SERVER_API_HOST}/api/users/${id}}`
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

export default function accountinformation({userData}) {
  return <AccountInformation userData={userData} />;
}
