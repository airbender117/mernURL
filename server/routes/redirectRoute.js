const express = require("express");
const router = express.Router();
const {
  handlePostRedirect,
  handleGetRedirect,
} = require("../controllers/url.js");
router.use(express.urlencoded({ extended: true }));
console.log("redirect.js loaded");


router.route("/").post(handlePostRedirect);
router.route("/:shortId").get(handleGetRedirect);

module.exports = router;
