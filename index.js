require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");

app.use(cors());
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.json({ message: "Make a POST request to /api/auth/signup to signup" });
});

//all routes here
app.use("/api/auth", authRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const PORT = 8081;

app.listen(PORT, function() {
  console.log(`Server is listening on port ${PORT}`);
});
