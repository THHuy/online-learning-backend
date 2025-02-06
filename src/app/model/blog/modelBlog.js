const connection = require("../../../config/connectdb");

class BlogModel {
  async select(callback) {
    const query = `SELECT B.IdUser, IdBlog, Title, Content, UserName, FullName
                    FROM Blog B, Users U 
                    WHERE (B.IdUser = U.IdUser) AND StatusBlog = 1 
                    LIMIT 5`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async selectBlogUser(idblog, callback) {
    const query = `SELECT B.IdUser, IdBlog, Title, Content, UserName, FullName
                    FROM Blog B, Users U 
                    WHERE (B.IdUser = U.IdUser) AND StatusBlog = 1 AND IdBlog = ?`;
    connection.query(query, idblog, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async selectSameBlog(username, callback) {
    const query = `SELECT B.IdUser, IdBlog, Title, Content, UserName, FullName
                    FROM Blog B, Users U 
                    WHERE (B.IdUser = U.IdUser) AND StatusBlog = 1 AND UserName =  ? LIMIT 5`;
    connection.query(query, username, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async getAllBlog(callback) {
    const query = `SELECT IdBlog, Title, FullName, StatusBlog  FROM Blog, Users WHERE Users.IdUser = Blog.IdUser`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  deleteBlog(idBlog, callback) {
    const query = `DELETE FROM Blog WHERE IdBlog = ?`;
    connection.query(query, idBlog, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  report(idBlog, idUser, callback) {
    const query = `INSERT INTO  Report (IdBlog, IdUser) VALUES (?, ?)`;
    connection.query(query, [idBlog, idUser], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  getReport(callback) {
    const query = `SELECT 
      r.IdReport,
      u.Username AS Reporter,
      b.Title AS BlogTitle,
      c.Content AS CommentContent,
      r.Reason,
      r.CreatedAt
    FROM Report r
    LEFT JOIN Users u ON r.IdUser = u.IdUser
    LEFT JOIN Blog b ON r.IdBlog = b.IdBlog
    LEFT JOIN Comments c ON r.IdCmt = c.IdCmt
    ORDER BY r.CreatedAt DESC`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  comment(IdUser, idBlog, content, callback) {
    const query =
      "INSERT INTO Comments (IdUser, IdBlog, Content) VALUES (?,?,?)";
    connection.query(query, [IdUser, idBlog, content], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  getComments(idBlog, page, callback) {
    const limit = 5;
    const offset = (page - 1) * limit;
    const query = `SELECT c.IdCmt, c.Content, c.CreatedAt, u.FullName
                  FROM Comments c
                  JOIN Users u ON c.IdUser = u.IdUser
                  WHERE c.IdBlog = ? AND c.DeletedAt IS NULL
                  LIMIT ? OFFSET ?`;
    connection.query(query, [idBlog, limit, offset], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  getAllCmt(callback) {
    const query = `SELECT c.IdCmt, c.Content, c.CreatedAt, u.FullName
                    FROM Comments c
                    JOIN Users u ON c.IdUser = u.IdUser`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  deleteComment(id, callback) {
    const query = `DELETE FROM Comments WHERE IdCmt = ? `;
    connection.query(query, id, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  UpdateCmt(id, content, callback) {
    const query = `UPDATE Comments SET Content = ? WHERE IdCmt = ?`;
    connection.query(query, [content, id], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  getCommentsID(idBlog, callback) {
    const query = `SELECT COUNT(*) AS count FROM Comments WHERE IdBlog = ? AND DeletedAt IS NULL`;
    connection.query(query, idBlog, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
}
module.exports = BlogModel;
