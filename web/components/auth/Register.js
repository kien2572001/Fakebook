import React from "react";
import { useEffect, useRef } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

const Register = () => {
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
  return (
    <div className="flex h-screen focus:outline-none">
      <div className="w-1/3 hidden xl:block bg-cyan-500">
        <img
          src="https://images.unsplash.com/photo-1517436073-3b1b1f2a8d5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          alt="login"
        />
      </div>
      <div className="w-2/3 m-auto flex justify-center items-center">
        <div className=" h-full m-auto">
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>

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
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Your Name"
              />
            </Form.Item>

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
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <div className="flex w-full flex-row my-2">
                <Checkbox className=" flex place-content-between ">
                  {" "}
                  Accept
                  <a className="font-bold ml" href="#">
                    {"  "}
                    Term and Conditions
                  </a>
                </Checkbox>
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
                  blocked
                >
                  Register
                </Button>
              </div>
            </Form.Item>
          </Form>
          <div className="w-full">
            <span className="text-gray-500">Already have a account</span>
            <a className="font-bold" href="./login">
              {" "}
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
