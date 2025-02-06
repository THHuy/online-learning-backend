const connection = require("../../../config/connectdb");

class NewPost {
  async savePost(idUser, title, content, callback) {
    const query =
      "INSERT INTO Blog (IdUser, Title, Content, StatusBlog) VALUES (?, ?, ?, 0)";
    connection.query(query, [idUser, title, content], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
  async newPost(idUser, title, content, callback) {
    const query =
      "INSERT INTO Blog (IdUser, Title, Content, StatusBlog) VALUES (?, ?, ?, 1)";
    connection.query(query, [idUser, title, content], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
  
}
module.exports = NewPost;
