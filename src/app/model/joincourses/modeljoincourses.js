const connection = require("../../../config/connectdb");

class joinCourses {
  async joinCourses(IdUser, IdCourse, callback) {
    const query = `INSERT INTO Userjoin (IdUser, IdCourse) VALUES (?,?)`;
    connection.query(query, [IdUser, IdCourse], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async checkUserjoin(IdUser, IdCourse, callback) {
    const query = `SELECT * FROM Userjoin WHERE IdUser = ? AND IdCourse = ?`;
    connection.query(query, [IdUser, IdCourse], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async UserJoinCourse(IdUser, callback) {
    const query = `SELECT * 
                    FROM UserJoin u
                    INNER JOIN Courses b ON b.IdCourse = u.IdCourse
                    WHERE u.IdUser = ?
                    `;
    connection.query(query, IdUser, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
}

module.exports = joinCourses;
