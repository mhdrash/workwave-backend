const router = require('express').Router();
const Application = require('../models/Application');
const JobCard = require('../models/JobCard');

router.post('/', async (req, res) => {
    try {
        const { applicantId, jobId } = req.body;

        const job = await JobCard.findById(jobId);
        if (!job) {
            return res.status(404).json({ err: 'Job card not found' });
        }

        const existingApplication = await Application.findOne({ applicant: applicantId, job: jobId });
        if (existingApplication) {
            return res.status(409).json({ err: 'Already applied to this job' });
        }

        const newApplication = await Application.create({
            applicant: applicantId,
            job: jobId
        });

        res.status(201).json({ application: newApplication });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('applicant', 'username')
            .populate('job', 'title description');
        if (applications.length === 0) {
            return res.status(404).json({ err: 'No applications found' });
        }
        res.status(200).json({ applications });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('applicant', 'username')
            .populate('job', 'title description');
        if (!application) {
            return res.status(404).json({ err: 'Application not found' });
        }
        res.status(200).json({ application });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedApplication = await Application.findByIdAndDelete(req.params.id);
        if (!deletedApplication) {
            return res.status(404).json({ err: 'Application not found' });
        }
        res.status(200).json({ msg: 'Application deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;