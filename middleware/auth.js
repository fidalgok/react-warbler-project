require("dotenv").load();
const jwt = require("jsonwebtoken");

exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        next();
      } else {
        res.status(401).json({ message: "Please log in first" });
      }
    });
  } catch (e) {
    res.status(401).json({ message: "Please log in first" });
  }
};

exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && req.params.id === decoded.id) {
        next();
      } else {
        res
          .status(401)
          .json({ message: "You are not authorized to perform that action" });
      }
    });
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

/*
exports.ensureCorrectUser = function(req,res,next){
  try {
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(decoded.userId === req.params.id){
        next();
      } else {
        res.status(401).json({message: 'Unauthorized'})
      }
    });
  } catch(e){
    res.status(401).json({message: 'Unauthorized'})
  }
}
*/
