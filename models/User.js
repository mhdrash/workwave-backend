const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: Number,
      required: true,
      unique: true,
      minlength: 3,
    },
    is_employer: {
      type: Boolean,
      default: false,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    profile:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  }
});

module.exports = mongoose.model('User', userSchema);