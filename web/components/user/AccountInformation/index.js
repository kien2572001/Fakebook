import react from "react";
import MainLayout from "~/components/layouts/MainLayout";
import { ArrowLeft } from "react-feather";
import styles from "~/styles/customCommon.module.css";
import ImageUpload from "./ImageUpload";
import Link from "next/link";

const AccountInformation = () => {
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
              <ImageUpload />
            </div>
            {/* Group last name first name */}
            <div className="flex flex-col laptop:flex-row">
              {/* First name box */}
              <div className="flex flex-col mb-6 laptop:grow laptop:mr-[15px]">
                <label htmlFor="first-name" className="mb-2 font-semibold">
                  First Name
                </label>
                {/* <input
                  id="first-name"
                  type="text"
                  className={`${styles["form-control"]} ${styles["custom-input"]}`}
                /> */}
                <input
                  id="first-name"
                  type="text"
                  className={`${styles["form-control"]} ${styles["custom-input"]}`}
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
              />
            </div>
            {/* Save button */}
            <div className="flex justify-start">
              <button className="font-semibold rounded-[0.3rem] text-center w-[175px] bg-[#05f] p-4 text-white">
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
