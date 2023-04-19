import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/local.module.css";

export default function Home() {
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(false);

  const handleChange = (el, index) => {
    if (isNaN(el.value)) {
      setOtp([...otp.map((data, i) => (i === index ? el.value : data))]);
      el.classList.add(styles.highlight);
    } else {
      setOtp([...otp.map((data, i) => (i === index ? el.value : data))]);
      el.classList.remove(styles.highlight);
    }

    if (el.nextSibling) {
      el.nextSibling.focus();
    }
  };

  const submitOtp = () => {
    const data = { otp: Number(otp.join("")) };
    axios
      .post("http://localhost:5000/verifyotp", data)
      .then((response) => {
        if (response.data.success == true) {
          router.push("/success");
        }
      })
      .catch((error) => {
        setError(true);
      });
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    const otpArray = pastedData
      .split("")
      .filter((data) => !isNaN(data))
      .slice(0, 6);
    const newOtp = [...otp];
    otpArray.forEach((data, index) => {
      newOtp[index] = data;
    });
    setOtp(newOtp);
  };

  return (
    <div className={styles.container}>
      <h3>Please Enter Your OTP</h3>
      {error && (
        <p>
          The OTP was not correct.
          <br />
          &nbsp;&nbsp;&nbsp;Please enter again
        </p>
      )}

      <div>
        {otp.map((data, i) => {
          return (
            <input
              type="text"
              name="otp"
              className={`${styles["otpInput"]} ${
                isNaN(data) ? styles.highlight : ""
              }`}
              maxLength={1}
              key={i}
              value={data}
              onChange={(e) => handleChange(e.target, i)}
              onFocus={(e) => e.target.select()}
              onPaste={handlePaste}
              onBlur={(e) => e.target.classList.remove(styles.highlight)}
            />
          );
        })}
      </div>
      <button onClick={submitOtp} className={styles.button}>
        <p>Submit</p>
      </button>
    </div>
  );
}
