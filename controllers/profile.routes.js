const routers = require('express').Router();
const Profile = require('../models/Profile');

routers.post('/', async (req, res) => {
    try {
        const createdProfile = await Profile.create(req.body);

        res.status(201).json({ profile: createdProfile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.get("/", async (req,res) => {
    try {
        const allProfiles = await Profile.find();

        res.status(201).json({profiles: allProfiles})
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
})

router.get("/:id", async (req,res) => {
    try {
        const foundProfile = await Profile.findById(params.id);

        res.status(201).json({profile: foundProfile })
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
})

module.exports = routers;