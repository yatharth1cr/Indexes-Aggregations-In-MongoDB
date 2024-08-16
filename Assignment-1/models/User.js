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
userSchema.index({ state: 1, country: 1 }); // Compound index

var User = mongoose.model("User", userSchema);

// Sample user creation
var sampleUser = new User({
  name: "John Doe",
  username: "johndoe",
  email: "johndoe@example.com",
  address: {
    city: "Sample City",
    state: "Sample State",
    country: "Sample Country",
    pin: 12345,
  },
});
// Save the sample user to the database
sampleUser.save((err) => {
  if (err) {
    console.error("Error saving the user:", err);
  } else {
    console.log("User saved successfully");
  }
});

// Export the User model
module.exports = User;
