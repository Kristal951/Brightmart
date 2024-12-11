const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  authMiddleWare,
} = require("../controllers/Auth");

const router = express.Router();
router.post("/SignUp", registerUser);
router.post("/Login", loginUser);
router.post('/Logout', logout);
router.get('/check-auth', authMiddleWare, (req, res)=>{
    const user = req.user
    res.status(200).json({
        status: 'success',
        messge: 'Authenticated User',
        user
    })
})

module.exports = router;
