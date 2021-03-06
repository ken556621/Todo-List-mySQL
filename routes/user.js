const express = require("express")
const router = express.Router()
const passport = require("passport")  

const db = require("../models")
const User = db.User

//認證系統路由
router.get("/login", (req, res) => {
    res.render("login")
})

router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/users/login' }),
    (req, res) => {
    res.redirect('/todos');
});

router.get("/register", (req, res) => {
    res.render("register")
})

router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
    User.findOne({ where: { email: email } }).then(user => {
        if(user){
            console.log("User is already exist.")
            res.render("register", { name, email, password, password2 })
        }else{
            const newUser = new User({
                name,
                email,
                password
            });
            newUser.save().then(user => {
                res.redirect("/")
            }).catch(err => console.log(err))
        }
    })
})

router.get("/logout", (req, res) => {
    res.send("成功登出")
})

module.exports = router