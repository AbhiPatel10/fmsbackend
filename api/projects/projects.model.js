const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
    manager: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      trim: true,
    },
    team: {
      type: Array,
      trim: true,
      ref: "Users",
    },
    description: {
      type: String,
      trim: true,
    },
    start_date: {
      type: Date,
      trim: true,
    },
    end_date: {
      type: Date,
      trim: true,
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

const Project = mongoose.model("Projects", projectSchema);

module.exports = Project;
