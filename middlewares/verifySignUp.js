const User = require('../models/User')

checkDuplicatePhone= (req, res, next) => {
    User.findOne({
      phone: req.body.phone
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (user) {
        res.status(400).send({ message: "Failed! Phone Number is already in use!" });
        return;
      }
  
      next()
    })
  }

const verifySignUp = {
  checkDuplicatePhone
};

module.exports = verifySignUp;
