const express = require("express");

const router = express.Router();

const Post = require("../models/Post");

/* CREATE POST */

router.post("/create", async(req,res)=>{

  try{

  const {
  username,
  title,
  content
}
= req.body;

   const newPost = new Post({

  username,

  title,

  content

});

    await newPost.save();

    res.json({
      message:"Post Created Successfully"
    });

  }

  catch(error){

    res.json({
      error:error.message
    });

  }

});

/* GET POSTS */

router.get("/all", async(req,res)=>{

  try{

    const posts =
    await Post.find();

    res.json(posts);

  }

  catch(error){

    res.json({
      error:error.message
    });

  }

});

/* DELETE POST */

router.delete("/delete/:id", async(req,res)=>{

  try{

    await Post.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:"Post Deleted Successfully"
    });

  }

  catch(error){

    res.json({
      error:error.message
    });

  }

});

/* EDIT POST */

router.put("/edit/:id", async(req,res)=>{

  try{

    const { title, content }
    = req.body;

    await Post.findByIdAndUpdate(

      req.params.id,

      {
        title,
        content
      }

    );

    res.json({
      message:"Post Updated Successfully"
    });

  }

  catch(error){

    res.json({
      error:error.message
    });

  }

});

/* LIKE POST */

router.put("/like/:id", async(req,res)=>{

  try{

    const post =
    await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    res.json({
      message:"Post Liked"
    });

  }

  catch(error){

    res.json({
      error:error.message
    });

  }

});

/* ADD COMMENT */

router.put("/comment/:id", async(req,res)=>{

  try{

    const { comment } = req.body;

    const post =
    await Post.findById(req.params.id);

    post.comments.push(comment);

    await post.save();

    res.json({
      message:"Comment Added"
    });

  }

  catch(error){

    res.json({
      error:error.message
    });

  }

});

module.exports = router;