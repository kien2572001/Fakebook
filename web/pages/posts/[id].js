import MainLayout from "~/components/layouts/MainLayout";
import { parserUserCookies } from "~/ultis/parser";
import PostCard from "~/components/layouts/ListPost/PostCard";
import { useEffect, useState } from "react";
import axios from "~/api/axios";
import { useRouter } from "next/router";
import { Spin } from "antd";

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

export default function posts({ userData }) {
  const [post, setPost] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const { id } = router.query;
    const fetchPost = async () => {
      const res = await axios.get(`/posts/${id}`);
      //console.log("post: ", res.data);
      if (res.status === 200) {
        setPost(res.data.data);
      }
    };
    fetchPost();
  }, []);

  return (
    <MainLayout userData={userData}>
      <div className="px-[15px] mt-3 laptop:px-0 laptop:mx-auto laptop:max-w-[800px]">
        {post && <PostCard item={post} />}
        {!post && (
          <div className="flex justify-center items-center mt-4">
            <Spin />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
