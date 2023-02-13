import SnakeGame from "~/components/game/SnakeGame";
import MainLayout from "~/components/layouts/MainLayout";
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

  return {
    props: {
      userData: userData,
    },
  };
}

export default function SnakeGamePage({ userData }) {
  return (
    <MainLayout userData={userData} >
      <SnakeGame userData={userData} />
    </MainLayout >
  );
}
