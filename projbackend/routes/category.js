const express = require("express");
const router = express.Router();
const {getCategoryById} = require("../controllers/category");
const {isAuthenticated,isAdmin,isSignedIn} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");



router.param("userId",getUserById);
router.param("catgoryId",getCategoryById);






  module.exports = router;