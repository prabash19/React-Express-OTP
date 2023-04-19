import React from "react";
import styles from "../styles/succes.module.css";
const success = () => {
  return (
    <div className={styles.container}>
      <div className={styles.messageBox}>
        <p>Your OTP Request Was Successfull</p>
      </div>
    </div>
  );
};

export default success;
