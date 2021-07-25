const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);
dataSchema.methods.toJSON = function () {
  const data = this;
  const dataObject = data.toObject();

  delete dataObject.avatar;

  return dataObject;
};

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
