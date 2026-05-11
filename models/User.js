const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    cpr: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      length: 9,
    },
    is_employer: {
      type: Boolean,
      default: false,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

module.exports = mongoose.model('User', userSchema);