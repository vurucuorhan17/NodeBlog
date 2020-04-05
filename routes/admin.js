const express = require("express");
const router = express.Router();
const Categories = require("../models/Categories");
const Post = require("../models/Post");
const path = require("path");

router.get("/",(req,res) => {
    res.render("admin/index");
});

router.get("/categories",(req,res) => {
    Categories.find({}).sort({$natural:-1}).then(categories => {
        res.render("admin/categories",{categories:categories});
    })
});

router.post("/categories",(req,res) => {
    Categories.create(req.body,(error,category) => {
        if(!error)
        {
            res.redirect("categories");
        }
    })
});

router.delete("/categories/:id",(req,res) => {
    Categories.remove({_id:req.params.id}).then(() => {
        res.redirect("/admin/categories");
    });
});

router.get("/posts",(req,res) => {
    Post.find({}).populate({path:"category",model:Categories}).sort({$natural:-1}).then(posts => {
        res.render("admin/posts",{posts:posts});
    })
    
});

router.delete("/posts/:id",(req,res) => {
    Post.remove({_id:req.params.id}).then(() => {
        res.redirect("/admin/posts");
    });
});

router.get("/posts/edit/:id",(req,res) => {
    
    Post.findOne({_id:req.params.id}).then(post => {
        Categories.find({}).then(categories => {
            res.render("admin/editpost",{post:post,categories:categories});
			console.log(post);
        });
    });
    
});

router.put("/posts/:id",(req,res) => {

    let postImage = req.files.post_image;

    postImage.mv(path.resolve(__dirname,"../public/img/postimages",postImage.name));

    Post.findOne({_id:req.params.id}).then(post => {
        post.title = req.body.title;
        post.content = req.body.content;
        post.category = req.body.category;
        post.date = req.body.date;
        post.post_image = `/img/postimages/${postImage.name}`;

        post.save().then(post => {
            res.redirect("/admin/posts");
        });

    });

});


module.exports = router;