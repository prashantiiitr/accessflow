import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    accessLevel: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Record", recordSchema);