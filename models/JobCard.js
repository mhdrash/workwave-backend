const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const JobCardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlenght: 4,
    },
    description: {
      type: String,
      required: true,
      minlenght: 30,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    }

  }
);

module.exports = mongoose.model('JobCard', JobCardSchema);