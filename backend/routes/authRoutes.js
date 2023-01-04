const router = require("express").Router()
const {REGISTER, LOGIN} = require("../controllers/authControllers")

router.post("/register", REGISTER)
router.post("/login", LOGIN)

module.exports = router;