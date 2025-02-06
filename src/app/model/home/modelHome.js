const connection = require("../../../config/connectdb");

class Home {
  async select(callback) {
    const query = `CALL GetAllUsers();`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
}
module.exports = Home;
