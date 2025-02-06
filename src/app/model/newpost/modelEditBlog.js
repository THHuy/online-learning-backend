const connection = require("../../../config/connectdb");

class EditBlog {
  async selectBlog(idBlog, callback) {
    const query = "SELECT * FROM Blog WHERE IdBlog = ?";
    connection.query(query, [idBlog], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
  async postBlog(idBlog, title, content, callback) {
    const query =
      "UPDATE Blog SET Title = ?, Content = ?, StatusBlog = 1 WHERE IdBlog = ?";
    connection.query(query, [title, content, idBlog], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
  async saveBlog(idBlog, title, content, callback) {
    const query = "UPDATE Blog SET Title = ?, Content = ? WHERE IdBlog = ?";
    connection.query(query, [title, content, idBlog], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
  async selectAllBlog(idUser, callback) {
    const query = "SELECT * FROM Blog WHERE IdUser = ? AND StatusBlog = 0";
    connection.query(query, [idUser], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
  async deleteBlog(idBlog, callback) {
    const query = "DELETE FROM Blog WHERE IdBlog = ? AND StatusBlog = 0";
    connection.query(query, [idBlog], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
}
module.exports = EditBlog;
