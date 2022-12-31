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
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Your Email Address"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                blocked
              >
                Log in
              </Button>
              Or <a href="./register">register now!</a>
            </Form.Item>

            <div className="w-full">
              <span className="text-gray-500">
                Or login with your social account
              </span>
              <div className="flex flex-col place-content-between my-4 w-full">
                <div className="flex flex-row place-content-between bg-[#0d66ff] rounded w-full  my-2">
                  <Button
                    className="w-full text-white font-semibold border-0 p-4 rounded"
                    type="primary"
                    htmlType="submit"
                    blocked
                    icon={<GoogleOutlined />}
                  >
                    Sign in with Google
                  </Button>
                </div>
                <div className="flex flex-row place-content-between bg-[#3b5999] rounded w-full my-2">
                  <div className="bg-white m-2"></div>
                  <Button
                    className="w-full text-white font-semibold border-0 p-4 rounded "
                    type="primary"
                    htmlType="submit"
                    blocked
                    icon={<FacebookOutlined />}
                  >
                    Sign in with Facebook
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
