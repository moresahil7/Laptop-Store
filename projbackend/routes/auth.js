var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');


const { signout, signup, signin, isSignedIn } = require("../controllers/auth");



router.post("/signup", [
    check("name")
    .isLength({ min: 3 })
    .withMessage('Name must be atleast three characters long'),
    check("password")
    .isLength({ min: 5 })
    .withMessage('Password must be atleast 5 characters long'),
    check("email")
    .isEmail()
    .withMessage('Emai is required')



], signup);

router.post("/signin", [



    check("email", "Email is required")
    .isEmail(),

    check("password")
    .isLength({ min: 5 })
    .withMessage(' Password is Required ')


], signin);







router.get("/signout", signout);




module.exports = router;