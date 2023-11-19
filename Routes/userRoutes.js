const express = require("express");
const router = express.Router(); // Use express.Router() instead of express.router()
const { registerUser, loginUser } = require("../controllers/UserController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
