const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors("*"));

app.listen(process.env.PORT, () => {
  console.log("server starting on", process.env.PORT);
});
app.post("/verifyotp", (req, res) => {
  let { otp } = req.body;
  if (otp.toString().length !== 6 || otp % 10 === 7) {
    res.status(400).json({
      success: false,
      message: "Given OTP is not valid",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Successfully Received",
    });
  }
});
