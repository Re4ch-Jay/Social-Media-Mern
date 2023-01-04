const router = require("express").Router()
const {CREATE_POST, GET_A_POST, GET_ALL_POST, UPDATE_POST, DELETE_POST, LIKE_DISLIKE} = require("../controllers/postControllers")

router.post("/", CREATE_POST)
router.put("/:id", UPDATE_POST)
router.delete("/:id", DELETE_POST)
router.get("/:id", GET_A_POST)
router.get("/timeline/all", GET_ALL_POST)
router.put("/:id/like", LIKE_DISLIKE)

module.exports = router;