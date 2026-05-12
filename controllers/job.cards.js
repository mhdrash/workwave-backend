const routers = require('express').Router();
const JobCard = require('../models/JobCard');
const Company = require('../models/Company');

routers.post('/', async (req, res) => {
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

module.exports = routers;