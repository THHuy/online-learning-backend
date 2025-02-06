const connection = require("../../../config/connectdb");

class Home {
  async select(callback) {
    const query = `SELECT * FROM Courses`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async selectCoursesId(id, callback) {
    const query = `
    select TitleSec, TitleVideo, Duration, Title, Des from courses c
    left join sections s on s.IdCourse = c.IdCourse
    left join lesson l on s.IdSec = l.IdSec
    where c.IdCourse = ?`;
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async getCoursesWithSections(callback) {
    const query = `SELECT 
                  c.IdCourse, 
                  c.Title AS CourseTitle, 
                  c.Des as CourseDes,
                  COUNT(s.IdSec) AS SectionCount
                  FROM Courses c
                  LEFT JOIN Sections s ON c.IdCourse = s.IdCourse
                  GROUP BY c.IdCourse;`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async deleteCourses(idCourse, callback) {
    const query = `DELETE FROM Courses WHERE IdCourse = ?`;
    connection.query(query, idCourse, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async addCourse(IdUser, Title, Thumb, Des, Price, callback) {
    const query = `INSERT INTO Courses (IdUser, Title, Thumb, Des, Price) VALUES (?,?,?,?,?)`;
    connection.query(
      query,
      [IdUser, Title, Thumb, Des, Price],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  async editCourse(Title, Thumb, Des, Price, IdCourse, callback) {
    const query = `UPDATE Courses SET Title = ?, Thumb = ?, Des = ?, Price = ? WHERE IdCourse = ?`;
    connection.query(
      query,
      [Title, Thumb, Des, Price, IdCourse],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  async getSec(callback) {
    const query = `SELECT * FROM Sections s, Courses c WHERE s.IdCourse = c.IdCourse`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async AddLesson(
    IdSec,
    VideoId,
    TitleVideo,
    Duration,
    Content,
    SortOrder,
    StatusLesson,
    callback
  ) {
    const query = `INSERT INTO Lesson (IdSec, VideoId, TitleVideo,Duration, Content, SortOrder, StatusLesson) VALUES (?,?,?,?,?,?,?)`;
    connection.query(
      query,
      [IdSec, VideoId, TitleVideo, Duration, Content, SortOrder, StatusLesson],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  async AddSections(idCourse, TitleSec, callback) {
    const query = `INSERT INTO Sections (IdCourse, TitleSec) VALUES (?,?)`;
    connection.query(query, [idCourse, TitleSec], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async getLessonPlay(idCourse, callback) {
    const query = `SELECT L.* 
                  FROM Lesson L
                  JOIN Sections S ON S.IdSec = L.IdSec
                  JOIN Courses C ON C.IdCourse = S.IdCourse
                  WHERE C.IdCourse = ?`;
    connection.query(query, idCourse, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async sreach(q, callback) {
    const query = `SELECT 'courses' AS type, IdCourse AS id, Title, Thumb AS image, Des AS description
    FROM Courses
    WHERE Title LIKE ? OR Des LIKE ?
    UNION
    SELECT 'blog' AS type, IdBlog AS id, Title, NULL AS image, Content AS description
    FROM Blog
    WHERE Title LIKE ? OR Content LIKE ?`;
    connection.query(
      query,
      [`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  async getBlogUser(q, callback) {
    const query = `SELECT * FROM Blog b, Users u WHERE  b.IdUser = u.IdUser AND (b.IdUser = ? AND StatusBlog = 1)`;
    connection.query(query, q, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async allLesson(callback) {
    const query = `SELECT * FROM Lesson L, Sections S WHERE L.IdSec = S.IdSec`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async deleteLesson(idLesson, callback) {
    const query = `DELETE FROM Lesson WHERE IdLesson = ?`;
    connection.query(query, idLesson, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  async deletesections(idLesson, callback) {
    const query = `DELETE FROM Sections WHERE IdSec = ?`;
    connection.query(query, idLesson, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
}
module.exports = Home;
