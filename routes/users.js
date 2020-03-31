const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/register",(req,res) => {
    res.render("site/register");
});

router.post("/register",(req,res) => {
    User.create(req.body,(err,user) => {
        req.session.sessionFlash = {
            type:"alert alert-info",
            message:"Kullanıcı başarılı bir şekilde oluşturuldu"
        };
        res.redirect("/users/login");
    });
});

router.get("/login",(req,res) => {
    res.render("site/login");
});

router.post("/login",(req,res) => {
    const {username,password} = req.body;
    User.findOne({username},(error,user) => {
        if(user)
        {
            if(user.password === password)
            {
                req.session.userId = user._id;
                res.redirect("/");
            }
            else
            {
                res.redirect("/users/login");
            }
        }
        else
        {
            res.redirect("/users/login");
        }
    });
});

router.get("/logout",(req,res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});


module.exports = router;
