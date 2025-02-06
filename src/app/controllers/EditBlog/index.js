const Data = require("../../model/newpost/modelEditBlog");
const data = new Data();
class newPostController {
  selectBlog(req, res, next) {
    const { id } = req.params;
    data.selectBlog(id, (err, blog) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message || "Có lỗi khi đăng bài",
        });
      }
      return res.status(200).json({
        message: "success",
        data: blog,
        title: blog[0].Title,
        content: blog[0].Content,
      });
    });
  }
  postBlog(req, res, next) {
    const { id } = req.params;
    const { title, content } = req.body;
    data.postBlog(id, title, content, (err, blog) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message || "Có lỗi khi đăng bài",
        });
      }
      return res.status(200).json({
        message: "success",
        data: blog,
      });
    });
  }
  saveBlog(req, res, next) {
    const { id } = req.params;
    const { title, content } = req.body;
    data.saveBlog(id, title, content, (err, blog) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message || "Có lỗi khi đăng bài",
        });
      }
      return res.status(200).json({
        message: "success",
        data: blog,
      });
    });
  }
  selectBlogUser(req, res, next) {
    const idUser = req.params.id;
    data.selectAllBlog(idUser, (err, blog) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message || "Có lỗi khi đăng bài",
        });
      }
      return res.status(200).json({
        message: "success",
        data: blog,
      });
    });
  }
  deleteBlog(req, res, next) {
    const idBlog = req.params.id;
    console.log(idBlog)
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
}
module.exports = new newPostController();
