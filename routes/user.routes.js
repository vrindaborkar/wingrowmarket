const authJwt = require('../middlewares/auth.jwt')
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/inward" , [authJwt.verifyToken ] , controller.postInward);
  app.post("/outward" , [authJwt.verifyToken ] , controller.postOutward);
  app.get("/inward" , [authJwt.verifyToken ] , controller.getInward);
  app.get("/outward" , [authJwt.verifyToken ] , controller.getOutward);
  app.get("/inwardData" , [authJwt.verifyToken ] , controller.getInwardData);
  app.get("/outwardData" , [authJwt.verifyToken ] , controller.getOutwardData);
  app.get("/farmer" , controller.getUser);
  app.get("/allusers" , controller.getAllUsers);
  app.get("/users" , controller.getUsers);
};
