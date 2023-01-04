const router = require("express").Router()
const {GET_USER} = require("../controllers/userControllers")

router.get("/:id", GET_USER)
router.post("/", )

module.exports = router;