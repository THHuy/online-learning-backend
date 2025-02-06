const Data = require("../../model/joincourses/modeljoincourses");
const data = new Data();
class homeController {
  index(req, res, next) {
    const { IdUser, id } = req.body;
    data.joinCourses(IdUser, id, (err, val) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
        data: val,
      });
    });
  }
  checkuser(req, res, next) {
    const { idUser, IdCourse } = req.query;
    data.checkUserjoin(idUser, IdCourse, (err, val) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
        data: val,
        isRegistered: true,
      });
    });
  }
  UserJoinCourse(req, res, next) {
    const idUser = req.params.id;
    data.UserJoinCourse(idUser, (err, val) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
        data: val,
      });
    });
  }
}
module.exports = new homeController();
