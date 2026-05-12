const router = require('express').Router();
const Company = require('../models/Company');
const User = require('../models/User');


router.post('/', async (req, res) => {
    try {
        const { name, cr, description, logo, crCert, website, employerId } = req.body;


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

module.exports = router;