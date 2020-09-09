const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
 
const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  name : {
    type: String,
    required: true
  },
  highScore : {
    type: Number,
    default: 0
  }
});

// pre-save hook that will be called before a document is saved in MongoDB.
UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

// method to validate that the user’s password is correct.
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}
 
const UserModel = mongoose.model('user', UserSchema);
 
module.exports = UserModel;
