const { console } = require("inspector");
const Data = require("../../model/login/modelLogin");
const data = new Data();

class loginController {
  login(req, res, next) {
    const { email, password } = req.body;
    data.Login(email, password, (err, login) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message || "Có lỗi khi đăng nhập",
        });
      } else if (login.length > 0) {
        return res.status(200).json({
          message: "success",
          data: login[0],
        });
      } else {
        return res.status(500).json({
          message: "fail",
          error: "Có lỗi khi đăng nhập",
        });
      }
    });
  }
}

module.exports = new loginController();
