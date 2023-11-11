const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const paymentSchema = new Schema({

  totalHours: {
    type: Number,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  paymentDate:{
    type: Date,
    required: true
  },
  userImage: {
    type: String,
  },
  userEmail: {
    type: String,
    required: true
  },
  wage: {
    type: Number,
    required: true
  },
  shifts: {
    type: Number,
    required: true
  },
  paidAmount: {
    type: Number,
    required: true
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    required: true,
  }
  
});
export default mongoose.model("payment", paymentSchema, "payments");
