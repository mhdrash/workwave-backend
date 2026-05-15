const router = require('express').Router();
const Company = require('../models/Company');
const User = require('../models/User');
const { route } = require('./company.routes');


router.post('/', async (req, res) => {
    try {
        const { name, cr, description, logo, crCert, website, employerId } = req.body;

        if (!name || !cr || !description || !crCert) {
            return res.status(400).json({ err: 'Missing required fields' });
        }

        const existingCompany = await Company.findOne({ name });
        if (existingCompany) {
            return res.status(409).json({ err: 'Company already exists' });
        }

        const newCompany = await Company.create({
            name,
            cr,
            description,
            logo,
            crCert,
            website,
            employer: employerId
        });

        res.status(201).json({ company: newCompany });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const companies = await Company.find().populate('employer', 'username');
        if (companies.length === 0) {
            return res.status(404).json({ message: 'No companies found' });
        }
        res.status(200).json({ companies });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).populate('employer', 'username');
        if (!company) {
            return res.status(404).json({ err: 'Company not found' });
        }
        res.status(200).json({ company });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, cr, description, logo, crCert, website } = req.body;

        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ err: 'Company not found' });
        }

        company.name = name || company.name;
        company.cr = cr || company.cr;
        company.description = description || company.description;
        company.logo = logo || company.logo;
        company.crCert = crCert || company.crCert;
        company.website = website || company.website;

        await company.save();
        res.status(200).json({ company });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).json({ err: 'Company not found' });
        }
        res.status(200).json({ msg: 'Company deleted successfully', company });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;