var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: { type: String },
  description: { type: String },
  tags: [String],
});

// creating indexes
articleSchema.index({ tags: 1 });
articleSchema.index({ title: "text" }, { description: "text" });

// exports
module.exports = mongoose.model("Article", articleSchema);
