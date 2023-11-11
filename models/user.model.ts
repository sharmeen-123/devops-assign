const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  dateJoined: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});
export default mongoose.model("user", userSchema, "users");
