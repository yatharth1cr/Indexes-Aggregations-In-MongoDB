var User = require("./models/User");
// Sample user creation
var sampleUser = [
  {
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    address: {
      city: "Sample City",
      state: "Sample State",
      country: "Sample Country",
      pin: 12345,
    },
  },

  {
    name: "Emily Wang",
    email: "emily.wang@example.com",
    username: "emilyw",
    address: {
      city: "Toronto",
      state: "Ontario",
      country: "Canada",
      pin: 2352,
    },
  },

  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    username: "alicej",
    address: {
      city: "New York",
      state: "New York",
      country: "USA",
      pin: 101,
    },
  },

  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    username: "bobsmith",
    address: {
      city: "San Francisco",
      state: "California",
      country: "USA",
      pin: 9401,
    },
  },

  {
    name: "Carlos Diaz",
    email: "carlos.diaz@example.com",
    username: "carlosd",
    address: {
      city: "Madrid",
      state: "Madrid",
      country: "Spain",
      pin: 2801,
    },
  },

  {
    name: "Fatima Al-Hassan",
    email: "fatima.hassan@example.com",
    username: "fatimah",
    address: {
      city: "Dubai",
      state: "Dubai",
      country: "UAE",
      pin: 123,
    },
  },
];
module.exports = sampleUser;
