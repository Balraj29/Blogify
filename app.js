require("dotenv").config()
const express= require("express");
const path = require("path");
const {checkforauthenticationcookie} =require("./middlewares/authentication")
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser")
const UserRoutes = require("./routes/user")
const blogroutes = require("./routes/blog")
const Blog = require("./models/blog");
const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDb Connnected"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({extended:false}))
app.use(cookieparser());
app.use(checkforauthenticationcookie("token"))


module.exports = (req, res) => {
    res.end("Hello from Node.js on Vercel!");
  };
  
app.get("/",async (req,res)=>{
    const allblogs = await Blog.find({});
    res.render("home",{
        user: req.user,
        blogs:allblogs,

    })
})
app.use("/user",UserRoutes);
app.use("/blog",blogroutes);

 app.listen(PORT,()=>{
    console.log(`Server Started on PORT ${PORT}`)
})

// module.exports = app;