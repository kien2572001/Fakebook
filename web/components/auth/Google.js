import { Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "~/api/axios";

export default function Google() {
  const router = useRouter();

  useEffect(() => {
    const loginGoogle = async () => {
      let data = router.query;
      const res = await axios.get('/auth/google/callback', { params: data })
      if (res.status === 200) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        router.push("/");
      }
      else {
        alert("Login failed");
        router.push("/auth/login");
      }
    };
    loginGoogle();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Spin size="large" />
    </div>
  );
}
