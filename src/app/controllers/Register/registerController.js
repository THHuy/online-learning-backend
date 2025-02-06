const Data = require("../../model/register/modelRegister");
const data = new Data();
class registerController {
  register(req, res, next) {
    const { email, password, fullName, username } = req.body;
    data.register(email, password, fullName, username, (err, register) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message || "Có lỗi xảy ra khi đăng ký",
        });
      }
      // Gửi lại thông báo "success" khi đăng ký thành công
      return res.status(200).json({
        message: "success",
        data: register,
      });
    });
  }
}
module.exports = new registerController();
