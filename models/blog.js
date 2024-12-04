const { Schema, model } = require("mongoose");
//const User = require("./user")


const BlogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
        required:false,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }
})

const Blog = model("blog",BlogSchema);
module.exports = Blog;