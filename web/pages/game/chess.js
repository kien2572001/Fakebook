import MainLayout from "~/components/layouts/MainLayout";
import { parserUserCookies } from "~/ultis/parser";
import { Chessboard } from "react-chessboard";
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

export default function ChessGame({ userData }) {
  return (
    <MainLayout userData={userData}>
      <div>Chess Game</div>
      <Chessboard id="BasicBoard" />
    </MainLayout>
  );
}
