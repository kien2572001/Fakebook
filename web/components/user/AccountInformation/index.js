import react from "react";
import MainLayout from "~/components/layouts/MainLayout";
import { ArrowLeft } from "react-feather";
import styles from "~/styles/customCommon.module.css";
import ImageUpload from "./ImageUpload";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "~/api/axios";
import Toast from "~/components/common/Toast";
import { toast } from "react-toastify";

const AccountInformation = ({ userData }) => {
  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [avatar, setAvatar] = useState(userData?.avatar || "");
  const [address, setAddress] = useState(userData?.address || "");
  const [city, setCity] = useState(userData?.city || "");
  const [country, setCountry] = useState(userData?.country || "");
  const [about, setAbout] = useState(userData?.about || "");

  useEffect(() => {
    console.log("userData", userData);
  }, []);

  const handleSave = async () => {

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

    const res = await axios.post("/users/modify-account-information", data);
    if (res?.status === 200) {
      alert("Update success")
    } else {
      alert("Update failed")
    }
  };

  return (
    <MainLayout>
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
            </div>
            <div className="flex flex-col laptop:flex-row">
              {/* Country */}
              <div className="flex flex-col mb-6 laptop:grow laptop:mr-[15px]">
                <label htmlFor="country" className="mb-2 font-semibold">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  className={`${styles["form-control"]} ${styles["custom-input"]}`}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
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
