const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rightsSchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      trim: true,
      unique: true,
    },
    role_id: {
      type: mongoose.Types.ObjectId,
      ref: "Roles",
      trim: true,
    },
    rights: [
      {
        SidebarID: {
          type: mongoose.Types.ObjectId,
          ref: "SideBar",
          trim: true,
        },
        Operations: {
          type: String,
          required: true,
          trim: true,
          enum: ['C', 'U', 'D', 'CU', 'UD', 'DC','CUD' ]
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

const Rights = mongoose.model("Rights", rightsSchema);

module.exports = Rights;
