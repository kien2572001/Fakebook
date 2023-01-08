import react from "react";
import MainLayout from "~/components/layouts/MainLayout";
import { ArrowLeft } from "react-feather";
import styles from "~/styles/customCommon.module.css";
import ImageUpload from "./ImageUpload";

const AccountInformation = () => {
  return (
    <MainLayout>
      <div className="px-[15px] mt-3">
        <div className="flex flex-col bg-white">
          {/* Header */}
          <div className="rounded-[0.3rem] bg-[#05f] w-full flex p-6 items-center">
            <ArrowLeft className="text-white" size={20} />
            <span className="text-white font-semibold text-lg ml-6 ">
              Account Details
            </span>
          </div>
          {/* Body */}
          <div className="flex flex-col p-6">
            {/* Avatar box */}
            <div className="px-[15px] flex items-center justify-center">
              <img
                src="http://sociala.uitheme.net/assets/images/pt-1.jpg"
                alt="avatar"
                className="w-[100px] h-[100px] rounded-[0.3rem] shadow-[0_0.125rem_0.25rem_0.125rem_rgba(0,0,0,0.08)]"
              />
            </div>
            {/* First name box */}
            <div className="flex flex-col mb-6">
              <label htmlFor="first-name" className="mb-2 font-semibold">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                className={`${styles["form-control"]} ${styles["custom-input"]}`}
              />
            </div>
            {/* Last name box */}
            <div className="flex flex-col mb-6">
              <label htmlFor="last-name" className="mb-2 font-semibold">
                Lastname
              </label>
              <input
                id="last-name"
                type="text"
                className={`${styles["form-control"]} ${styles["custom-input"]}`}
              />
            </div>
            {/* Email */}
            <div className="flex flex-col mb-6">
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
            <div className="flex flex-col mb-6">
              <label htmlFor="phone" className="mb-2 font-semibold">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                className={`${styles["form-control"]} ${styles["custom-input"]}`}
              />
            </div>
            {/* Country */}
            <div className="flex flex-col mb-6">
              <label htmlFor="country" className="mb-2 font-semibold">
                Country
              </label>
              <input
                id="country"
                type="text"
                className={`${styles["form-control"]} ${styles["custom-input"]}`}
              />
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
            {/* City */}
            <div className="flex flex-col mb-6">
              <label htmlFor="city" className="mb-2 font-semibold">
                City
              </label>
              <input
                id="city"
                type="text"
                className={`${styles["form-control"]} ${styles["custom-input"]}`}
              />
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
                <button className="font-semibold rounded-[0.3rem] text-center w-[175px] bg-[#05f] p-4 text-white">Save</button>
                </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountInformation;
