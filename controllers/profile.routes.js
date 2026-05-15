const router = require('express').Router();
const Profile = require('../models/Profile');

router.post("/", async (req, res) => {
    try {
        const createdProfile = await Profile.create(req.body);
        res.status(201).json({ profile: createdProfile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const allProfiles = await Profile.find();
        if (allProfiles.length === 0) {
            return res.status(404).json({ err: 'No profiles found' });
        }
        res.status(200).json({ profiles: allProfiles });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const foundProfile = await Profile.findById(req.params.id);
        if (!foundProfile) {
            return res.status(404).json({ err: 'Profile not found' });
        }
        res.status(200).json({ profile: foundProfile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProfile) {
            return res.status(404).json({ err: 'Profile not found' });
        }
        res.status(200).json({ profile: updatedProfile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
        if (!deletedProfile) {
            return res.status(404).json({ err: 'Profile not found' });
        }
        res.status(200).json({ msg: 'Profile deleted successfully', profile: deletedProfile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;