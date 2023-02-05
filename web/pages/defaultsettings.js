import DefaultSetting from "~/components/user/DefaultSetting";
import { parserUserCookies } from "~/ultis/parser";

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

  return {
    props: {
      userData: userData,
    },
  };
}


export default function defaultsettings({userData}) {
  return <DefaultSetting userData={userData} />;
}
