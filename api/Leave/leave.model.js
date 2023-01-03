const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leaveSchema = new Schema(
  {
    user_id: {
      type: String,
      trim: true,
      require: true,
      ref: "Users"
    },
    leaveType: {
      type: String,
      trim: true,
      require: true,
      enum: ["LEAVE", "COMPENSATORY_OFF"],
    },
    start_date: {
      type: Date,
      trim: true,
      require: true,
    },
    end_date: {
      type: Date,
      trim: true,
      require: true,
    },
    reason: {
      type: String,
      trim: true,
      require: true,
    },
    status:{
      type: String,
      trim: true,
      enum: ["PENDING", "APPROVED", "REJECT"],
      default: "PENDING"
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

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
