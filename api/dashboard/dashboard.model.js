const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dashboardSchema = new Schema(
  {
    image: {
      type: Buffer,
      contentType: String,
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

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

module.exports = Dashboard;
