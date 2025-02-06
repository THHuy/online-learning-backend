const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json()); // Để parse body request
const route = require("./router");
route(app);
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "thhuy2100180@student.ctuet.edu.vn", //Tài khoản gmail vừa tạo
    pass: "yred djen xqja xrnp", //Mật khẩu tài khoản gmail vừa tạo
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
app.post("/send-verification-email", (req, res) => {
  const { email } = req.body;
  const generateVerificationCode = () => {
    return Math.floor(1000 + Math.random() * 9000); // Tạo mã xác nhận ngẫu nhiên 4 chữ số
  };
  const verificationCode = generateVerificationCode();
  var content = "";
  content += `
      <div style="padding: 10px; background-color: #003375">
          <div style="padding: 10px; background-color: white;">
              <h4 style="color: #0085ff">Đây là mail nhận mã xác nhận</h4>
              <span style="color: black">Đây là mã xác nhận của bạn: ${verificationCode}</span>
          </div>
      </div>
  `;
  const mailOptions = {
    from: "thhuy2100180@student.ctuet.edu.vn",
    to: email,
    subject: "Mã xác nhận của bạn",
    text: `Đây là mã xác nhận của bạn: ${verificationCode}`,
    html: content,
  };

  // Gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Gửi email không thành công" });
    }
    res.status(200).json({
      message: "Email đã được gửi!",
      verificationCode: verificationCode, // Gửi mã xác nhận (nếu muốn gửi kèm)
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
