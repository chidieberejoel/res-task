const { Schema, model } = require("mongoose");

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

module.exports = model("Restaurants", userSchema);
