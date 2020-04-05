const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/register",(req,res) => {
    res.render("site/register");
});

router.post("/register",(req,res) => {
    const pass = req.body.password;

    bcrypt.hash(pass,saltRounds,(err,hash) => {
        User.create({
            "username":req.body.username,
            "email":req.body.email,
            "password":hash
        });
    });
    res.redirect("/users/login");
});

router.get("/login",(req,res) => {
    res.render("site/login");
});

router.post("/login",(req,res) => {
    const {username,password} = req.body;
    User.findOne({username},(error,user) => {
        if(user)
        {

            bcrypt.compare(password,user.password,(err,result) => {

                if(result === true)
                {
                    req.session.userId = user._id;
                    res.redirect("/");
                }
                else
                {
                    res.redirect("/users/login");
                }

            });

            // if(user.password === password)
            // {
            //     req.session.userId = user._id;
            //     res.redirect("/");
            // }
            // else
            // {
            //     res.redirect("/users/login");
            // }
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
