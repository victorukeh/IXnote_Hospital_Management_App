const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roles'
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  department:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
 },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  timestamp: { type: Date, default: Date.now },
});

//Encrypt password
UserSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
  );
  UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }

  

const UserModel = mongoose.model('user', UserSchema);

//Validate a User
const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.types.String().min(6).max(30).required(),
    lastName: Joi.types.String().min(6).max(30).required(),
    roles: Joi.types.String().required(),
    phoneNumber: Joi.types.Number().min(6).max(30).required(),
    email: Joi.types.String().email().required(),
    department: Joi.types.String().required(),
    password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
		timestamp: Joi.types.Date(),

  })
  return schema.validate(user)
}
module.exports = {
  UserModel,
  validateUser,
}