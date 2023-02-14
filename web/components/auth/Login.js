import axios from "~/api/axios";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Mail, Lock, Menu, Zap } from "react-feather";
import Image from "next/image";
import Facebook from "../../public/icon-2.png";
import Google from "../../public/icon-1.png";
import LoginBackground from "../../public/login-bg.jpg";

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const isLaptop = useMediaQuery(992);
  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const errorPasswords = [
    "Password is required",
    "Password is too short (minimum is 6 characters)",
    "Password is too long (maximum is 128 characters)",
    "secial characters are not allowed",
  ];
  const errorEmails = ["Email is required", "Email is invalid"];

  const handleLoginWithGoogle = async () => {
    const response = await axios.get("/auth/google");
    router.push(response.data.data);
    console.log(response);
  };

  useEffect(() => {
    console.log("Router: ", router);
  }, []);

  const validateEmail = () => {
    setEmailError([]);
    setIsErrorEmail(false);
    let error = [];
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
      error.push(errorEmails[0]);
    } else {
      if (!regex.test(email)) {
        error.push(errorEmails[1]);
      }
    }
    if (error.length > 0) {
      setEmailError(error);
      setIsErrorEmail(true);
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    setPasswordError([]);
    setIsErrorPassword(false);
    let error = [];
    if (!password) {
      error.push(errorPasswords[0]);
    } else {
      if (password.length < 6) {
        error.push(errorPasswords[1]);
      }
      if (password.length > 128) {
        error.push(errorPasswords[2]);
      }
      if (!password.match(/^[a-zA-Z0-9]+$/)) {
        error.push(errorPasswords[3]);
      }
    }
    if (error.length > 0) {
      setPasswordError(error);
      setIsErrorPassword(true);
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    let check1 = validateEmail();
    let check2 = validatePassword();
    if (check1 && check2) {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post("/auth/login", data);
      console.log(response);

      if (response.status === 200) {
        //localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        router.push("/");
      } else {
        setPasswordError(["Email or password is incorrect"]);
        setIsErrorPassword(true);
      }
    }
  };
  return (
    <div className="w-full h-screen mini-desktop:grid mini-desktop:grid-cols-12 relative">
      <div className="fixed top-0 w-full flex justify-between items-center px-[15px] py-[9px] z-50 laptop:h-[90px] laptop:py-[0px]">
        <div className="flex items-center">
          {isLaptop ? (
            <Zap size="28" className="text-[#10d876]" />
          ) : (
            <Zap size="36" className="text-[#10d876]" />
          )}

          <span className="text-2xl laptop:text-[32px] font-semibold  ml-[5px] text-[#0055ff] font-fredoka tracking-[1px]">
            Sociala.
          </span>
        </div>
        <div className="">
          <Menu size={27} className="" />
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LoginBackground.src}
        alt="avatar"
        className="absolute hidden mini-desktop:inline-block scale-100 h-full"
      />
      {/* Left block */}
      <div className="hidden mini-desktop:block mini-desktop:col-span-5 h-full overflow-x-hidden"></div>
      {/* Right block */}
      <div className="flex items-center h-full mini-desktop:col-span-7 bg-white z-10">
        {/* Login form */}
        <div className="flex flex-col min-w-[320px] mini-desktop:min-w-[380px] mini-desktop:max-w-[400px] mx-auto p-4">
          {/* Header */}
          <div className="mb-4 text-3xl font-bold mini-desktop:text-4xl">
            Login into <br></br> your account
          </div>
          {/* Input email */}
          <div className="m-[2px] w-full relative mb-4">
            <div className="absolute top-[18px] left-[18px]">
              <Mail color="#adb5bd" size={22} />
            </div>
            <input
              type="text"
              className="w-full h-[60px] rounded-[7px] leading-[60px] font-semibold py-[6px] pl-12 pr-3 border-2 border-[#eee] border-solid text-[#212529] text-sm "
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isErrorEmail &&
              emailError.map((error, index) => (
                <div key={index} className="text-red-500 text-sm mb-2">
                  {error}
                </div>
              ))}
          </div>

          {/* Input password */}
          <div className="m-[2px] w-full relative mb-4">
            <div className="absolute top-[18px] left-[18px]">
              <Lock color="#adb5bd" size={22} />
            </div>
            <input
              type="password"
              className="w-full h-[60px] rounded-[7px] leading-[60px] font-semibold py-[6px] pl-12 pr-3 border-2 border-[#eee] border-solid text-[#212529] text-sm "
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
            />
            {isErrorPassword &&
              passwordError.map((error, index) => (
                <div key={index} className="text-red-500 text-sm mb-2">
                  {error}
                </div>
              ))}
          </div>

          {/* Remember and forgot */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 ml-1 border-[1px] border-[#eee] rounded"
              />
              <span className="text-sm text-gray-text">Remember me</span>
            </div>
            <div className="text-sm font-semibold text-[#495057]">
              Forgot your Password?
            </div>
          </div>
          {/* Login button */}
          <button
            className="w-full h-[60px] rounded-[7px] leading-[60px] font-semibold border-0 mb-1 text-[#fff] bg-[#343a40] text-sm "
            onClick={handleLogin}
          >
            Login
          </button>
          {/* Register button */}
          <div className="text-sm font-medium leading-[32px] text-gray-text">
            Don't have an account?{" "}
            <a
              onClick={() => router.push("/auth/register")}
              className="text-[#1E74FD] font-bold ml-1"
            >
              Register
            </a>
          </div>
          {/* Social sign in */}
          <div className="mt-2 flex flex-col">
            <h6 className="text-sm font-semibold text-gray-text mb-4 mx-auto">
              Or, Sign in with your social account
            </h6>
            {/* Google */}
            <div
              className="w-full h-[60px] flex items-center bg-[#0d66ff] rounded-[7px] cursor-pointer mb-2"
              onClick={handleLoginWithGoogle}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="flex items-center mr-[60px] mb-1 ml-2">
                <Image src={Google} alt="Google" width={40} height={40} />
              </div>
              <span className="leading-[60px] font-semibold text-white text-sm  ">
                Sign in with Google
              </span>
            </div>
            {/* Facebook */}
            <div className="w-full h-[60px] flex items-center bg-[#3b5999] rounded-[7px] cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="flex items-center mr-[60px] mb-1 ml-2">
                <Image src={Facebook} alt="Google" width={40} height={40} />
              </div>
              <span className="leading-[60px] font-semibold text-white text-sm  ">
                Sign in with Facebook
              </span>
            </div>
          </div>
        </div>
        {/* End login form */}
      </div>
    </div>
  );
}
