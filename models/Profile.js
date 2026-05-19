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
        type: String,

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
    },
    location: {
        type: String,

    },
    locationType:{
        type: String,
    },
    startDate: {
        type: String,

    },
    endDate: {
        type: String,

    },
    description: {
        type: String,
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


module.exports = mongoose.model('profile', ProfileSchema);