const Data = require("../../model/home/modelHome");
const data = new Data();
class homeController {
  index(req, res, next) {
    data.select((err, val) => {
      if (err) {
        console.log(err);
      }
      res.json(val[0]);
    });
  }
}
module.exports = new homeController();
