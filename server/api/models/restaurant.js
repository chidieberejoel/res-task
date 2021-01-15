import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    open_hours: {
      type: String,
    },
  },
);

export default model("Restaurants", userSchema);
