const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobCard"
    }

  }
);

module.exports = mongoose.model('Application', ApplicationSchema);