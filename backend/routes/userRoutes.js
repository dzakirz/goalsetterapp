const express = require("express")
const { registerUser, loginUser, authUser } = require("../controllers/userController")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/", registerUser)

router.post("/login", loginUser)

router.get("/auth", protect, authUser)

module.exports = router
