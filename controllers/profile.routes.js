const routers = require('express').Router();
const Profile = require('../models/Profile');
const router = require('./company.routes');

routers.post("/",async (req,res) => {
    const createdProfile = await Profile.create(req.body);

    res.status(201).json({Profile: createdProfile});
});

router.get("/",async (req,res) => {
    const allProfiles = await Profile.find().populate();

    res.status(201).json({profiles: allProfiles});
});

router.get("/:id",async (req,res) => {
    try {
        const foundProfile = await Profile.findById(req.params.id);

        res.status(201).json({profile: foundProfile});
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.get("/delete/:id",async (req,res) => {
    try {
        const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
        res.status(204).json("Profile deleted seccussfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
})

module.exports = routers;