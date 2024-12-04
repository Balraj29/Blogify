const { Router} = require("express");
const multer = require("multer");
const path  = require("path");
const User = require("../models/user")
const Blog = require("../models/blog")
const Comment = require("../models/comment")

const route = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${file.originalname}`
      cb(null,uniqueSuffix )
    }
  })

  const upload = multer({ storage: storage })

route.get("/add-new",(req,res)=>{
    res.render("addblog",{
        user:req.user,
    })
})

route.get("/:id",async (req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({blogId:req.params.id}).populate("createdBy")
    
    res.render("blog",{
      user:req.user,
      blog,
      comments,
    })
})
route.post("/",upload.single("CoverImage"),async (req,res)=>{
    const { title, body} = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`,
    })
    res.redirect("/")
})

route.post("/comment/:blogId",async (req,res)=>{
  const comment=await Comment.create({
    content:req.body.content,
    blogId:req.params.blogId,
    createdBy:req.user._id,
  })

  res.redirect(`/blog/${req.params.blogId}`)
})


module.exports = route;