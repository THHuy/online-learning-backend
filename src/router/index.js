const homeRouter = require("./route_home/home.route");
const blogRouter = require("./route_home/blog.api");
function route(app) {
  app.use("/api", homeRouter);
  app.use("/post", blogRouter);
}
module.exports = route;
