import React from "react";
import axios from "~/api/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Mail, Lock, UserPlus, Menu} from "react-feather";
import Image from "next/image";
import registerBackground from "../../public/login-bg-2.jpg";
const Register = () => {
const router = useRouter();
//axios 
/*
*   form state
*/
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [passwordConfirmation, setPasswordConfirmation] = useState("");
const setType = (e,type) => {
  type(e.target.value);
}
/*
* validate form
*/
const [nameError, setNameError] = useState([]);
const [emailError, setEmailError] = useState([]);
const [passwordError, setPasswordError] = useState([]);
const [ConfirmPasswordError, setConfirmPasswordError] = useState([]);

const errorNames = [
"Name is required"
]
const errorPasswords = [
"Password is required", 
"Password is too short (minimum is 6 characters)", 
"Password is too long (maximum is 128 characters)",
"secial characters are not allowed"];
const errorEmails = [
"Email is required",
"Email is invalid",
];
const errorConfirmPasswords = [
"Password confirmation doesn't match Password"
]

  const validateEmail = () => {
    setEmailError([]);
    
    let error = [];
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!email){
      error.push(errorEmails[0]);
    }else{
    if(!regex.test(email)){
      error.push(errorEmails[1]);
    }
    }
    if(error.length > 0){
      setEmailError(error);
      return false;
    }
    return true;
  }

  const validatePassword = () => {
    setPasswordError([]);
    let error = [];
    if(!password){
      error.push(errorPasswords[0]);
    }
    if(password.length < 6){
      error.push(errorPasswords[1]);
    }
    if(password.length > 128){
      error.push(errorPasswords[2]);
    }
    if(!password.match(/^[a-zA-Z0-9]+$/)){
      error.push(errorPasswords[3]);
    }
    if(error.length > 0){
      setPasswordError(error);
      return false;
    }
    return true;
  }

  const validateConfirmPassword = () => {
    setConfirmPasswordError([]);
    let error = [];
    if(!passwordConfirmation){
      error.push(errorPasswords[0])
    }
    if(password.length<6){
      error.push(errorPasswords[1]);
    }
    if(password.length>128){
      error.push(errorPasswords[2]);
    }
    if(!password.match(/^[a-zA-Z0-9]+$/)){
      error.push(errorPasswords[3]);
    }
    if(password !== passwordConfirmation){
      error.push(errorConfirmPasswords[0]);
    }
    if(error.length > 0){
      setConfirmPasswordError(error);
      return false;
    }
    return true;
  }

  const validateName = () => {
    setNameError([]);
    let error = [];
    if(!name){
      error.push(errorNames[0]);
    }
    if(error.length > 0){
      setNameError(error);
      return false;
    }
    return true;
  }
/*
*   handler
*/
const handlerRegister = async (e) => {
  let check1 = validateName();
  let check2 = validateEmail();
  let check3 = validatePassword();
  let check4 = validateConfirmPassword();
  if(check1 && check2 && check3 && check4){
      /*
      * API
      */
     const data = {
        name: name,
        email: email,
        password: password,
     }
      const response = await axios.post("/auth/register", data);
      if(response.status === 200){
        router.push("/auth/login");
        console.log(response);
      }else{
        console.log('error');
      }
  }
}
  return (
    <div className="w-full h-screen laptop:grid laptop:grid-cols-12 relative">
      <div className="fixed top-0 w-full flex justify-between items-center px-[15px] py-[9px] z-50 laptop:h-[90px] laptop:py-[0px]">
        <div className="flex items-center">
          {/* {width < 992 ? (
            <Zap size="28" className="text-[#10d876]" />
          ) : (
            <Zap size="36" className="text-[#10d876]" />
          )} */}

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
        src={registerBackground.src}
        alt="avatar"
        className="absolute hidden laptop:inline-block scale-100 h-full"
      />
      {/* Left block */}
      <div className="hidden laptop:block laptop:col-span-5 h-full  overflow-x-hidden"></div>
      {/* Right block */}
      <div className="flex items-center h-full laptop:col-span-7 bg-white z-10">
        {/* register form */}
        <div className="flex flex-col min-w-[320px] laptop:min-w-[380px] laptop:max-w-[400px] mx-auto p-4">
          {/* Header */}
          <div className="mb-4 text-3xl font-bold laptop:text-4xl">
            Create <br></br> your account
          </div>
          {/* Input email */}
          <div className="m-[2px] w-full relative mb-4">
            <div className="absolute top-[18px] left-[18px]">
                <UserPlus color="#adb5bd" size={22} />
            </div>
            <input
              type="text"
              className="w-full h-[60px] rounded-[7px] leading-[60px] font-semibold py-[6px] pl-12 pr-3 border-2 border-[#eee] border-solid text-[#212529] text-sm "
              placeholder="Your Name"
              value={name}
              onChange={(e)=>setType(e,setName)}
            />
            {!nameError.length==0 && nameError.map((item,index)=>(
            <div className="text-red-500 text-sm" key={index}>{item}</div>
          ))}
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
              onChange={(e)=>setType(e,setEmail)}
            />
            {!emailError.length==0 && emailError.map((item,index)=>(
            <div className="text-red-500 text-sm" key={index}>{item}</div>
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
              value={password}
              onChange={(e)=>setType(e,setPassword)}
            />
          </div>
          {!passwordError.length==0 && passwordError.map((item,index)=>(
            <div className="text-red-500 text-sm" key={index}>{item}</div>
          ))}
          <div className="m-[2px] w-full relative mb-4">
            <div className="absolute top-[18px] left-[18px]">
              <Lock color="#adb5bd" size={22} />
            </div>
            <input
              type="password"
              className="w-full h-[60px] rounded-[7px] leading-[60px] font-semibold py-[6px] pl-12 pr-3 border-2 border-[#eee] border-solid text-[#212529] text-sm "
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e)=>setType(e,setPasswordConfirmation)}
            />
            {!ConfirmPasswordError.length==0 && ConfirmPasswordError.map((item,index)=>(
            <div className="text-red-500 text-sm" key={index}>{item}</div>
            ))}
          </div>
          
          {/* Remember and forgot */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 ml-1 border-[1px] border-[#eee] rounded"
              />
              <span className="text-sm text-gray-text">Accept Term and Conditions</span>
            </div>
          </div>
          {/* Register button */}
          <button
            className="w-full h-[60px] rounded-[7px] leading-[60px] font-semibold border-0 mb-1 text-[#fff] bg-[#343a40] text-sm "
            onClick={handlerRegister}
          >
            Register
          </button>
          {/* Register button */}
          <div className="text-sm font-medium leading-[32px] text-gray-text">
            Already have account{" "}
              <a onClick={()=>router.push('/auth/login')} className="text-[#1E74FD] font-bold ml-1">Login</a>
          </div>
          {/* Social sign in */}
        </div>
        {/* End login form */}
      </div>
    </div>
  );
}

export default Register