var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: { type: String },
  description: { type: String },
  tags: [String],
});
