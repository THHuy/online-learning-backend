const Data = require("../../model/login/modelLogin");
const data = new Data();

class GetUser {
  getUser(req, res, next) {
    data.getUser((err, user) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
        data: user,
      });
    });
  }
  deleteUser(req, res, next) {
    console.log(req.params);
    const idUser = req.params.idUser;
    data.deleteUser(idUser, (err, user) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
      });
    });
  }
  updateUser(req, res, next) {
    const IdUser = req.params.idUser;
    const { FullName, UserName, Email, Pwd } = req.body;
    data.updateUser(IdUser, FullName, UserName, Email, Pwd, (err, user) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
      });
    });
  }
  getUserId(req, res, next) {
    const IdUser = req.params.id;
    data.getUserId(IdUser, (err, user) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
        data: user,
      });
    });
  }
}

module.exports = new GetUser();
