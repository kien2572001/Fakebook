import React from "react";
import styles from "~/styles/Main.module.css";

export default function Group() {
    return (
        <div className="laptop:w-[318px] w-full">
            {/* Group stat */}
            <div className={styles.card}>
                <div className="">
                    <img src="http://sociala.uitheme.net/assets/images/bb-9.jpg" alt="" />
                </div>
            </div>
            {/* About */}
            <div className={styles.card}></div>
            {/* Photos */}
            <div className={styles.card}></div>
            {/* Events */}
            <div className={styles.card}></div>
        </div>
    )
}