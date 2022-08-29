const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

route.post("/s3-url-images", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Good so far...");
});

module.exports = route;
