const Data = require("../../model/newpost/modelNewPost");
const data = new Data();
class newPostController {
  newPost(req, res, next) {
    const { idUser, title, content } = req.body;
    data.newPost(idUser, title, content, (err, data) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message || "Có lỗi khi đăng bài",
        });
      }
      const BlogId = data.insertId;
      return res.status(200).json({
        message: "success",
        data: data,
        BlogId: BlogId,
      });
    });
  }
  postSave(req, res, next) {
    const { idUser, title, content } = req.body;
    data.savePost(idUser, title, content, (err, data) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message || "Có lỗi khi đăng bài",
        });
      }
      const BlogId = data.insertId;
      return res.status(200).json({
        message: "success",
        data: data,
        BlogId: BlogId,
      });
    });
  }
  
}
module.exports = new newPostController();
