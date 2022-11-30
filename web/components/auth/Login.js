import React from "react";
import { useEffect, useRef } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import loginPic from "../../public/login.jpg";
import fbIcon from "../../public/fb_icon.png";
import ggIcon from "../../public/gg_icon.png";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const passwordInput = useRef(null);

  useEffect(() => {
    if (passwordInput.current) {
      // or, if Input component in your ref, then use input property like:
      // passwordInput.current.input.focus();
      passwordInput.current.focus();
    }
  }, [passwordInput]);
  const myLoader = ({ src, width, quality }) => {
    return `../../public/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div className="flex h-screen focus:outline-none">
      <div className="w-1/3 hidden xl:block ">
        <Image src={loginPic} alt="login" />
      </div>
      <div className="w-2/3 m-auto flex justify-center items-center">
        <div className=" h-full m-auto">
          <h1 className="text-3xl font-bold mb-2">Login in to your account</h1>

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              placeholder="Your Email Address"
              className="flex text-red-700 font-extralight text-sm"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <div className="flex place-content-between border border-gray-300 rounded p-2 my-4 active:border-sky-600 focus-within:border-sky-600">
                <MailOutlined className="p-1 pt-[8px] leading-[0] text-[#094067]" />
                <Input
                  className="leading-none outline-none font-normal text-base text-[#094067]"
                  placeholder="Your Email Address"
                />
              </div>
            </Form.Item>

            <Form.Item
              name="password"
              className="flex text-red-700 font-extralight text-sm"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <div className="flex border border-gray-300 rounded p-2 my-4 active:border-sky-600 focus-within:border-sky-600">
                <LockOutlined className="p-1 pt-[8px] text-[#094067]" />
                <Input
                  className="leading-none flex outline-none font-normal text-base text-[#094067]"
                  type="password"
                  placeholder="Password"
                  ref={passwordInput}
                />
              </div>
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <div className="flex w-full flex-row place-content-between my-2">
                <Checkbox className=" flex place-content-between ">
                  Remember me
                </Checkbox>
                <a className="font-bold" href="#">
                  Forgot Password
                </a>
              </div>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <div className="flex w-full flex-row place-content-between bg-[#343a40] rounded my-4">
                <Button
                  className="w-full text-white font-semibold border-0 p-4 rounded hover:bg-[#57616b]"
                  type="primary"
                  htmlType="submit"
                >
                  Login
                </Button>
              </div>
            </Form.Item>
          </Form>
          <div className="w-full">
            <span className="text-gray-500">Don't have an account?</span>
            <a className="font-bold" href="./register">
              {" "}
              Sign Up
            </a>
          </div>
          <div className="w-full">
            <span className="text-gray-500">
              Or login with your social account
            </span>
            <div className="flex flex-col place-content-between my-4 w-full">
              <div className="flex flex-row place-content-between bg-[#0d66ff] rounded w-full  my-2 hover:bg-[#6e97df]">
                <div className="bg-white m-2">
                  <Image src={ggIcon} alt="fb" width={30} height={30} />
                </div>
                <Button
                  className="w-full text-white font-semibold border-0 p-4 rounded"
                  type="primary"
                  htmlType="submit"
                >
                  Sign in with Google
                </Button>
              </div>
              <div className="flex flex-row place-content-between bg-[#3b5999] rounded w-full my-2 hover:bg-[#708dca]">
                <div className="bg-white m-2">
                  <Image src={fbIcon} alt="fb" width={20} height={20} />
                </div>
                <Button
                  className="w-full text-white font-semibold border-0 p-4 rounded "
                  type="primary"
                  htmlType="submit"
                >
                  Sign in with Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
