import react from "react";
import MainLayout from "~/components/layouts/MainLayout";
import { ArrowLeft } from "react-feather";
import styles from "~/styles/customCommon.module.css";
import ImageUpload from "./ImageUpload";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "~/api/axios";
import { message, Select } from "antd";

const AccountInformation = ({ userData }) => {
  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [avatar, setAvatar] = useState(userData?.avatar || "");
  const [address, setAddress] = useState(userData?.address || "");
  const [city, setCity] = useState(userData?.city || "");
  const [country, setCountry] = useState(userData?.country ||"your country");
  const [about, setAbout] = useState(userData?.about || "");
  const [gender, setGender] = useState(userData?.gender || "Select your gender");
  const [countryIMG, setCountryIMG] = useState("https://upload.wikimedia.org/wikipedia/commons/c/cb/The_Blue_Marble_%28remastered%29.jpg");
  const [countries, setCountries] = useState([{}]);
  const [indexContry, setIndexContry] = useState(0);
  const [currentCountry, setCurrentCountry] = useState({});
  useEffect(() => {
    //console.log("userData", userData);
    //axios get  data conutries
    axios
      .get(
        "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json?fbclid=IwAR36AT-dZJ0840y7aEpeQV9Weegi5xMU5H16Dnea39lnc1YRJkhfRRDQDqk"
      )
      .then((res) => {
        console.log("res", res.data);
        if(country!== "your country"){
          const index =  res.data.find((item)=>item.name === country);
          console.log("index",index)
          setCountryIMG(index.image);
      }
        setCountries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  /*
   * validation
   */
  const [phoneError, setPhoneError] = useState("");
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [stateSubmit, setStateSubmit] = useState(false);
  const validationPhone = () => {
    setIsPhoneError(false);
    if (!phone) {
      setPhoneError("Phone is required");
      setIsPhoneError(true);
      return false;
    }
    // regex phone
    const regexPhone = /^0[0-9]{9,10}$/;
    if (!regexPhone.test(phone)) {
      setPhoneError("Phone is invalid");
      setIsPhoneError(true);
      return false;
    }
    return true;
  };
  const testGender = (value) => {
    setGender(value);
  }
  const handleSave = async () => {
    setStateSubmit(true);
    console.log("firstName", firstName);
    console.log("lastName", lastName);
    console.log("email", email);
    console.log("phone", phone);
    console.log("avatar", avatar);
    console.log("address", address);
    console.log("city", city);
    console.log("country", country);
    console.log("about", about);
    console.log("gender",gender)
    if (
      validationPhone() &&
      firstName &&
      lastName &&
      address &&
      city &&
      country &&
      gender
    ) {
      const data = new FormData();
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("email", email);
      data.append("phone", phone);
      data.append("avatar", avatar);
      data.append("address", address);
      data.append("city", city);
      data.append("country", country);
      data.append("about", about);
      data.append("gender", gender);
      const res = await axios.post("/users/modify-account-information", data);
      if (res?.status === 200) {
        message.success("Update success");
      } else {
        message.error("Update fail");
      }
    }
  };

  const handleContry = (value) => {
    setIndexContry(value);
    setCountry(countries[value].name);
    setCountryIMG(countries[value].image);
  };
  return (
    <MainLayout userData={userData}>
      <div className="px-[15px] mt-3 laptop:px-0 laptop:mx-auto laptop:max-w-[800px]">
        <div className="flex flex-col bg-white">
          {/* Header */}
          <div className="rounded-[0.3rem] bg-[#05f] w-full flex p-6 items-center">
            <Link href="/defaultsettings">
              <ArrowLeft className="text-white" size={20} />
            </Link>
            <span className="text-white font-semibold text-lg ml-6 ">
              Account Details
            </span>
          </div>
          {/* Body */}
          <div className="flex flex-col p-6 laptop:p-12">
            {/* Avatar box */}
            <div className="px-[15px] flex items-center justify-center mb-6">
              <ImageUpload avatar={avatar} setAvatar={setAvatar} />
            </div>
            {/* Group last name first name */}
            <div className="flex flex-col laptop:flex-row">
              {/* First name box */}
              <div className="flex flex-col mb-6 laptop:grow laptop:mr-[15px]">
                <label htmlFor="first-name" className="mb-2 font-semibold">
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  className={`${styles["form-control"]} ${styles["custom-input"]}`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {!firstName && stateSubmit && (
                  <span className="text-red-500">First name is required</span>
                )}
              </div>
              {/* Last name box */}
              <div className="flex flex-col mb-6 laptop:grow laptop:ml-[15px]">
                <label htmlFor="last-name" className="mb-2 font-semibold">
                  Lastname
                </label>
                <input
                  id="last-name"
                  type="text"
                  className={`${styles["form-control"]} ${styles["custom-input"]}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {!lastName && stateSubmit && (
                  <span className="text-red-500">Last name is required</span>
                )}
              </div>
            </div>
            {/*gender*/}
            <div className="flex flex-col laptop:flex-row">
              <div className="flex flex-col mb-6 laptop:grow laptop:mr">
                <label htmlFor="gender" className="mb-2 font-semibold">
                  Gender
                </label>
                {/* <select
                  id="gender"
                  className={
                    `${styles["form-control"]} ${styles["custom-input"]}` +
                    "content-center"
                  }
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option 
                    
                  >Your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select> */}
                <Select
                  options={[
                    {
                      value: "Male",
                      label: "Male",
                    },
                    {
                      value: "Female",
                      label: "Female",
                    },
                    {
                      value: "Other",
                      label: "Other",
                    },
                  ]}
                  value={gender}
                  onChange={testGender}
                />

                {!gender && stateSubmit && (
                  <span className="text-red-500">Gender is required</span>
                )}
              </div>
            </div>
            {/* group email and phone */}
            <div className="flex flex-col laptop:flex-row">
              {/* Email */}
              <div className="flex flex-col mb-6 laptop:grow laptop:mr-[15px]">
                <label htmlFor="email" className="mb-2 font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  className={`${styles["form-control"]} ${styles["custom-input"]}`}
                  disabled
                  value={email}
                />
              </div>
              {/* Phone */}
              <div className="flex flex-col mb-6 laptop:grow laptop:ml-[15px]">
                <label htmlFor="phone" className="mb-2 font-semibold">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  className={`${styles["form-control"]} ${styles["custom-input"]}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {isPhoneError && stateSubmit && (
                  <span className="text-red-500">{phoneError}</span>
                )}
              </div>
            </div>
            {/* Address */}
            <div className="flex flex-col mb-6">
              <label htmlFor="address" className="mb-2 font-semibold">
                Address
              </label>
              <input
                id="address"
                type="text"
                className={`${styles["form-control"]} ${styles["custom-input"]}`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {!address && stateSubmit && (
                <span className="text-red-500">Address is required</span>
              )}
            </div>
            <div className="flex flex-col laptop:flex-row">
              {/* Country */}
              <div className="flex flex-col mb-6 laptop:grow laptop:mr-[px]">
                <label htmlFor="country" className="mb-2 font-semibold">
                  Country
                </label>
                <select
                  className={`${styles["form-control"]} ${styles["custom-input"]}+"content-center"`}
                  id="country"
                  onChange={(e) => handleContry(e.target.value)}
                >
                  <option selected>{country}</option>
                  {countries.length > 0 &&
                    countries.map((country, index) => (
                      <option
                        key={country.id}
                        value={index}
                        className="indent-3"
                      >
                        {country.name}
                      </option>
                    ))}

                  {/* <img src={`${countries[indexContry].image}`} /> */}
                </select>
                {!country && stateSubmit && (
                  <span className="text-red-500">Country is required</span>
                )}
              </div>
              <div className="flex flex-col relative laptop:grow items-center">
                <img
                    src={`${countryIMG}`}
                    className="absolute object-cover rounded-full shadow-lg top-6"
                  />
              </div>
              {/* City */}
              <div className="flex flex-col mb-6 laptop:grow laptop:ml-[15px]">
                <label htmlFor="city" className="mb-2 font-semibold">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className={`${styles["form-control"]} ${styles["custom-input"]}`}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
               
                {!city && stateSubmit && (
                  <span className="text-red-500">City is required</span>
                )}
              </div>
            </div>
            {/* About */}
            <div className="flex flex-col mb-6">
              <label htmlFor="about" className="mb-2 font-semibold">
                About
              </label>
              <textarea
                id="about"
                type="text"
                className={`${styles["form-control"]} ${styles["custom-input"]} min-h-[100px] p-4 bg-[#f5f5f5]`}
                placeholder="Write something about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            {/* Save button */}
            <div className="flex justify-start">
              <button
                className="font-semibold rounded-[0.3rem] text-center w-[175px] bg-[#05f] p-4 text-white"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountInformation;
