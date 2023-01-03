const { object } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: "Projects",
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String, 
      enum: ["ASSIGN", "INPROGRESS", "TEST", "DONE"],
      default: "ASSIGN",
      required: true,
    },
    comments: {
      type: Array,
      trim: true,
    },
    AssignBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      trim: true,
      required: true,
    },
    AssignTo: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      trim: true,
      required: true,
    },
    Duration: {
      type: Object,
      trim: true,
      required: true,
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

const Tasks = mongoose.model("Tasks", taskSchema);

module.exports = Tasks;
