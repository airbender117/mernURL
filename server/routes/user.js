const express = require('express')
const router = express.Router()
const { handleUserSignUp, handleUserLogin,handleUserInfo } = require('../controllers/user')
router.use(express.urlencoded({ extended: true }));

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/getuser/:email",handleUserInfo)


module.exports = router