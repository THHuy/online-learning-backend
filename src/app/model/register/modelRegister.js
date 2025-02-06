const connection = require("../../../config/connectdb");

class Register {
  async register(email, password, fullName, username, callback) {
    const query = `CALL InsertUser(?, ?, ?,?)`;
    connection.query(
      query,
      [fullName, username, email, password],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
}
module.exports = Register;
