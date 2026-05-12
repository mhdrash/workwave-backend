const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    institution: {
        type: String,
    },
    degreeLevel: {
        type: String,
        required: true,
    },
    educationField:{
        type: String,
        required: true,
    },
    date: {
        type: date,

    },
    grade: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

const experienceSchema = new mongoose.Schema({
    organization: {
        type: String,
    },
    occupation: {
        type: String,
        required: true,
    },
    location: {
        type: String,

    },
    locationType:{
        type: String,
        required: true,
    },
    startDate: {
        type: date,

    },
    endDate: {
        type: date,

    },
    description: {
        type: String,
        required: true,
    },
})



const ProfileSchema = new mongoose.Schema(
  {
    name: String,
    about: String,
    education: educationSchema,
    experience: experienceSchema
    
  }
);

const newProfile = {
    name:"Husain",
    about:'Buildign project',
    education:{
        degreeLevel: 'Master',

    }
}


module.exports = mongoose.model('profile', JobCardSchema);