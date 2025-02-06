const Data = require("../../model/courses/modelCourses");
const data = new Data();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// Thiết lập thư mục lưu trữ ảnh
const uploadDir = path.join(
  __dirname,
  "../../../../../frontend/public/asset/img/thumb"
);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
var arrImg = [];
// Cấu hình Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    arrImg.push(filename);
    cb(null, filename);
  },
});
const upload = multer({ storage });
class homeController {
  index(req, res, next) {
    data.select((err, val) => {
      if (err) {
        console.log(err);
      }
      res.json(val);
    });
  }
  select_id_courses(req, res, next) {
    const id = req.params.id;
    data.selectCoursesId(id, (err, course) => {
      if (err) {
        console.log(err);
      }
      res.json(course);
    });
  }
  getCoursesWithSections(req, res, next) {
    data.getCoursesWithSections((err, course) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
        data: course,
      });
    });
  }
  deleteCourses(req, res, next) {
    const idCourses = req.params.id;
    data.deleteCourses(idCourses, (err, course) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
      });
    });
  }
  //

  uploadimg(req, res, next) {
    const uploadSingle = upload.single("file"); // Tên field là "file"
    uploadSingle(req, res, (err) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi tải lên ảnh",
          error: err.message,
        });
      }
      // Đường dẫn ảnh trong frontend (trả về cho frontend sử dụng)
      const filePath = `/asset/img/thumb/${req.file.filename}`;
      return res.status(200).json({
        message: "Tải ảnh thành công",
        filePath,
      });
    });
  }
  addcourse(req, res, next) {
    const { IdUser, CourseTitle, CourseDes, Price } = req.body;
    const fileName = `/asset/img/thumb/${arrImg.slice(-1)[0]}`;
    data.addCourse(
      IdUser,
      CourseTitle,
      fileName,
      CourseDes,
      Price,
      (err, data) => {
        if (err) {
          return res.status(500).json({
            message: "fail",
            error: err.message,
          });
        }
        return res.status(200).json({
          message: "success",
        });
      }
    );
  }
  editCourse(req, res, next) {
    const { CourseTitle, CourseDes, Price } = req.body;
    const IdCourse = req.params.id;
    const fileName = `/asset/img/thumb/${arrImg.slice(-1)[0]}`;
    data.editCourse(
      CourseTitle,
      fileName,
      CourseDes,
      Price,
      IdCourse,
      (err, data) => {
        if (err) {
          return res.status(500).json({
            message: "fail",
            error: err.message,
          });
        }
        return res.status(200).json({
          message: "success",
        });
      }
    );
  }
  sections(req, res, next) {
    // Gọi hàm getSec để lấy danh sách các chương học
    data.getSec((err, sections) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
        data: sections,
      });
    });
  }
  Addlessons(req, res, next) {
    // Gọi hàm getSec để lấy danh sách các chương học
    const {
      IdSec,
      VideoId,
      TitleVideo,
      Duration,
      Content,
      SortOrder,
      StatusLesson,
    } = req.body;
    data.AddLesson(
      IdSec,
      VideoId,
      TitleVideo,
      Duration,
      Content,
      SortOrder,
      StatusLesson,
      (err, lesson) => {
        if (err) {
          return res.status(500).json({
            message: "fail",
            error: err.message,
          });
        }
        return res.status(200).json({
          message: "success",
        });
      }
    );
  }
  addSection(req, res, next) {
    // Gọi hàm getSec để lấy danh sách các chương học
    const { TitleSec, CourseId } = req.body;
    data.AddSections(CourseId, TitleSec, (err, sections) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
      });
    });
  }
  getLessonPlay(req, res, next) {
    const idCourse = req.query.idCourse;
    data.getLessonPlay(idCourse, (err, playlist) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
        data: playlist,
      });
    });
  }
  search(req, res, next) {
    const { q } = req.query;
    data.sreach(q, (err, data) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
        data: data,
      });
    });
  }
  getBlogUser(req, res, next) {
    const { id } = req.params;
    data.getBlogUser(id, (err, data) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
        data: data,
      });
    });
  }
  allLesson(req, res, next) {
    data.allLesson((err, data) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
        data: data,
      });
    });
  }
  deleteLesson(req, res, next) {
    const { id } = req.params;
    data.deleteLesson(id, (err, data) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
      });
    });
  }
  deletesections(req, res, next) {
    const { id } = req.params;
    data.deletesections(id, (err, data) => {
      if (err) {
        return res.status(500).json({
          message: "fail",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "success",
      });
    });
  }
}

module.exports = new homeController();
