const authJwt = require('../middlewares/auth.jwt')
const controller = require("../controllers/stalls.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/stalls",[authJwt.verifyToken], controller.getStalls)
  app.get("/bookedstalls",[authJwt.verifyToken], controller.getbookedStalls)
  app.delete("/bookedstalls",[authJwt.verifyToken], controller.deletebookedStalls)
  app.post("/bookedstalls",[authJwt.verifyToken], controller.postbookedStalls)
  app.put('/stalls' , [authJwt.verifyToken , authJwt.isFarmer] , controller.putStalls)
  app.post('/stalls' , controller.postStalls)
  app.put('/reset' ,  controller.resetStalls)
  app.get("/inwardoutward",[authJwt.verifyToken], controller.getInOutData)
  app.post("/cancelledstalls",[authJwt.verifyToken], controller.postcancelledstalls)
  app.get("/cancelledstalls",[authJwt.verifyToken], controller.getcancelledstalls)
  app.delete("/cancelledstalls",[authJwt.verifyToken], controller.deletecancelledStalls)
  
};
