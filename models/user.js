const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const Userschema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profilepicture: {
      type: String,
      default: "/images/default.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash password
Userschema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  // Generate a salt
  const salt = await bcrypt.genSalt(10);
  this.salt = salt;

  // Hash the password using the salt
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;

  next();
});

const User = model("user", Userschema);
module.exports = User;
