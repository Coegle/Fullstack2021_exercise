const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  name: String,
  passwordHash: String,
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret.passwordHash
    delete ret.__v
    delete ret._id
  }
})
/* 
  可能造成 _id to be unique 的问题
  may cause User validation failed: _id: Error, expected `_id` to be unique.
  see: https://github.com/blakehaswell/mongoose-unique-validator/issues/131
*/
// userSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User