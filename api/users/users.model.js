const mongoose = require("mongoose");
var crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: true,
    },
    last_name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role: {
      type: mongoose.Types.ObjectId,
      ref: "Roles",
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:""
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
