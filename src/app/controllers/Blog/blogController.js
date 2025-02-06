const Data = require("../../model/blog/modelBlog");
const data = new Data();
class homeController {
  index(req, res, next) {
    data.select((err, val) => {
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
  selectBlogusers(req, res, next) {
    const id = req.query;
    const idBlog = id.IdBlog;
    data.selectBlogUser(idBlog, (err, val) => {
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
  sameBlog(req, res, next) {
    const Username = req.query.UserName;
    data.selectSameBlog(Username, (err, val) => {
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
  getAllBlog(req, res, next) {
    data.getAllBlog((err, val) => {
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
  deleteBlog(req, res, next) {
    const idBlog = req.params.id;
    data.deleteBlog(idBlog, (err) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message || "Có lỗi khi đăng bài",
        });
      }
      return res.status(200).json({});
    });
  }
  report(req, res, next) {
    const { IdBlog, IdUser } = req.body;
    data.report(IdBlog, IdUser, (err, val) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({ val });
    });
  }
  getReport(req, res, next) {
    data.getReport((err, val) => {
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
  comment(req, res, next) {
    const { IdUser, idBlog, content } = req.body;
    data.comment(IdUser, idBlog, content, (err, val) => {
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
  comments(req, res, next) {
    const idBlog = req.params.id;
    const page = req.query.page;
    data.getComments(idBlog, page, (err, val) => {
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
  getAllCmt(req, res, next) {
    data.getAllCmt((err, val) => {
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
  deleteComment(req, res, next) {
    const idCmt = req.params.id;
    data.deleteComment(idCmt, (err, val) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({ val });
    });
  }
  UpdateCmt(req, res, next) {
    const idCmt = req.params.id;
    const { content } = req.body;
    data.UpdateCmt(idCmt, content, (err, val) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({ val });
    });
  }
  countCmt(req, res, next) {
    const idBlog = req.params.id;
    data.getCommentsID(idBlog, (err, val) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
        data: val[0].count,
      });
    });
  }
}
module.exports = new homeController();
