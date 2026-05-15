const router = require('express').Router();
const JobCard = require('../models/JobCard');
const Company = require('../models/Company');

router.post('/', async (req, res) => {
    try {
        const { title, description, companyId } = req.body;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ err: 'Company not found' });
        }

        const newJobCard = await JobCard.create({
            title,
            description,
            company: companyId
        });

        res.status(201).json({ jobCard: newJobCard });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const jobCards = await JobCard.find().populate('company', 'name');
        if (jobCards.length === 0) {
            return res.status(404).json({ err: 'No job cards found' });
        }
        res.status(200).json({ jobCards });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const jobCard = await JobCard.findById(req.params.id).populate('company', 'name');
        if (!jobCard) {
            return res.status(404).json({ err: 'Job card not found' });
        }
        res.status(200).json({ jobCard });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedJobCard = await JobCard.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );
        if (!updatedJobCard) {
            return res.status(404).json({ err: 'Job card not found' });
        }
        res.status(200).json({ jobCard: updatedJobCard });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedJobCard = await JobCard.findByIdAndDelete(req.params.id);
        if (!deletedJobCard) {
            return res.status(404).json({ err: 'Job card not found' });
        }
        res.status(200).json({ message: 'Job card deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;