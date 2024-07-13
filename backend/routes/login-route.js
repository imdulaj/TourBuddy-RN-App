const express = require("express");
const router = express.Router();


// Import the userLogin function from the login controller
const { userLogin } = require("../controllers/login-contraller");

// Define a POST route for handling user login requests
router.post("/", userLogin);
module.exports = router;