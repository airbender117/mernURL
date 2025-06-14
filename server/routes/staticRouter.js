const express = require('express')
const router = express.Router()
// const { signup } = require("../controller/user")
router.get("/", (req, res) => {
    return res.json({message:'this is the home'})
})
router.get("/signup", (req, res) => {
    return res.json({message:'this is the sign up'})
})
router.get("/login", (req, res) => {
    return res.json({message:'this is the login'})
})



// router.route('/signup').get(signup)
module.exports = router