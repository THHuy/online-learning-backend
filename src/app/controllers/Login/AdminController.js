const Data = require("../../model/login/modelLogin");
const data = new Data();

class AdminController {
  checkUserAdmin(req, res, next) {
    const { IdUser } = req.body;
    data.admin(IdUser, (err, data) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      if (data.length > 0) {
        const isAdmin = data[0].Kind.readUInt8(0) === 1; // Chuyển đổi Kind sang Boolean
        return res.json({ isAdmin });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    });
  }
}

module.exports = new AdminController();
