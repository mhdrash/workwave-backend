const mongoose = require('mongoose');



const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        cr: {
            type: Number,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        logo: {
            type: Image,
        },
        crCert: {
            type: String,
            required: true
        },
        website: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Company', companySchema);