const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      trim: true,
    },
    date: {
      type: String,
      trim: true,
      require: true,
    },
    attendance: [
      {
        time: {
          type: String,
          require: true,
          trim: true,
        },
        status: {
          type: String,
          required: true,
          trim: true,
          enum: ["CHECKIN", "CHECKOUT"],
        },
      },
    ],
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

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
