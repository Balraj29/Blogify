const {Router } = require("express")
const User = require("../models/user")
const bcrypt = require("bcrypt");
const route = Router();
const {createTokenForUser, validateToken } =require("../services/authentication")

route.get("/signup",(req,res)=>{
    return res.render("signup");
})
route.get("/signin",(req,res)=>{
    return res.render("signin");
})
route.post("/signin", async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render("signin", { error: "User not found" });
        }
  
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.render("signin", { error: "Invalid Email or password" });
        }
  
        // Create and send token
        const token = createTokenForUser(user);
        return res.cookie("token", token).redirect("/");
    } catch (err) {
        return res.render("signin", { error: "Server error occurred. Please try again." });
    }
});
route.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
})

route.post("/signup", async(req,res)=>{
    const { fullname,email,password } = req.body;
    await User.create({
        fullname,
        email,
        password,
    })
    res.redirect("/")
})

module.exports = route;