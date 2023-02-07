
import { Filter, Search, Video } from "react-feather";
import MainLayout from "~/components/layouts/MainLayout";
import Group from "~/components/group/Group";
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


export default function group({
  userData,
})
{
  return (
    <MainLayout userData={userData}>
      <Group userData={userData} />
    </MainLayout>
  );
}
