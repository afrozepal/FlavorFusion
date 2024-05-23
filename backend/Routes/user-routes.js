const express = require('express');
const router = express.Router();
const { signup, login, verifyToken, getUser, refreshToken, logout, forgotPassword, getReccommendations } = require("../Controllers/user-controller");

router.get('/', (req,res,next) => {
    res.send("hello!!");
})
router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);
router.post("/forgotpassword", forgotPassword)
router.get("/reccommendations", getReccommendations)
// router.put("/updateLike/:recipeId", updateLike)

module.exports = router;