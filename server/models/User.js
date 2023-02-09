const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: { type: String, enum: ["client, admin"] }
})

UserSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email: email });
  return user;
};

module.exports = mongoose.model("user", UserSchema)