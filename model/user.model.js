const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  age: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  education: {
    type: String,
    default: "",
  },
  mobile: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  nationality: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
