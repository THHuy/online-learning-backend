const connection = require("../../../config/connectdb");

class Login {
  async Login(email, password, callback) {
    const query = `SELECT IdUser, FullName, Email, UserName FROM Users WHERE Email = ? AND Pwd = ?`;
    connection.query(query, [email, password], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async admin(idUser, callback) {
    const query = `SELECT Kind FROM Users WHERE IdUser = ?`;
    connection.query(query, idUser, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async getUser(callback) {
    const query = `SELECT * FROM Users`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async deleteUser(IdUser, callback) {
    const query = `DELETE FROM Users WHERE IdUser = ?;`;
    connection.query(query, IdUser, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async updateUser(IdUser, FullName, UserName, Email, Pwd, callback) {
    const query = `UPDATE Users
                  SET FullName = ?, UserName = ?, Email = ?, Pwd = ?
                  WHERE IdUser = ?`;
    connection.query(
      query,
      [FullName, UserName, Email, Pwd, IdUser],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  async getUserId(IdUser, callback) {
    const query = `SELECT * FROM Users WHERE IdUser = ?`;
    connection.query(query, IdUser, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
}

module.exports = Login;
