const express = require('express')
const router = express.Router()
const {handleRedirect} = require ('../controllers/url.js')
router.use(express.urlencoded({ extended: true }));

router.route('/:shortId').post(handleRedirect)




module.exports=router