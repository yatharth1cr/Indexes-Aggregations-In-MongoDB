var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    address: {
      city: String,
      state: String,
      country: String,
      pin: Number,
    },
  },
  { timestamps: true }
);

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ "address.state": 1, "address.country": 1 }); //Compound index

var User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
