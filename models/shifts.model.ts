const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const shiftSchema = new Schema({
  checkinTime: {
    type: Date,
  },
  checkoutTime: {
    type: Date,
  },
  checkinLocation: {
    type: Object,
  },
  checkoutLocation:{
    type: Object,
  },
  totalHours: {
    type: String,
  },
  lastLocation: {
    type: Object,
  },
  locations: {
    type: Array,
  },
  status: {
    type: String,
  },
  isPaid:{
    type: Boolean,
    required:true,
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    required: true,
  }
  
});
export default mongoose.model("shift", shiftSchema, "shifts");
