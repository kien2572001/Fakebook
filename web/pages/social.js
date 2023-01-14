import React from "react";
import styles from "~/styles/Main.module.css";
import SocialForm from "~/components/forms/SocialForm";
import MainLayout from "~/components/layouts/MainLayout";

export default function Social() {
    return (
        <MainLayout>
        <SocialForm />
        </MainLayout>
    );
};