const mongoose = require("mongoose");

const UserFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email ID"],
  },
  message: {
    type: String,
    required: [true, "Please Enter Your Message"],
  },
});

const UserForm = mongoose.model("UserForm", UserFormSchema);
module.exports = UserForm;
