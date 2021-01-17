import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model("User", userSchema);
