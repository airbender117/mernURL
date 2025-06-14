const express = require('express')
const router = express.Router()
const { handleURLGenerator, handleRedirect, handleGetAnalytics, hanRed } = require("../controllers/url")


router.route('/').post(handleURLGenerator)
// router.route('/:shortId').get(handleRedirect)
// router.route("/redirect").post(handleRedirect)
router.route('/analytics/:shortId').get(handleGetAnalytics)

module.exports = router
