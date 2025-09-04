const Profile = require('../models/Profile');

// Create Profile
exports.createProfile = async (req, res) => {
    try {
        const profile = await Profile.create(req.body);
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Profiles
exports.getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single Profile by ID
exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Profile
exports.deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Get projects filtered by skill
// search the match for skills and return all the userid with match skills
exports.getProjectsBySkill = async (req, res) => {
    try {
        const { skill } = req.query;
        if (!skill) return res.status(400).json({ message: "Skill is required" });

        const profiles = await Profile.find(
             { skills: skill } //this will the search in the document
            ,{ projects: 1, name: 1, email: 1 }); //these are the return after the match
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get top skills (aggregated count)
// List down top 10 skills present in the database
exports.getTopSkills = async (req, res) => {
    try {
        const skills = await Profile.aggregate([
            { $unwind: "$skills" }, //breaking up the skills array with id
            { $group: { _id: "$skills", count: { $sum: 1 } } }, //group the skills and get the counts
            { $sort: { count: -1 } }, //sort the array according to the top skills 
            { $limit: 10 } //it will show just the top 10 skills
        ]);
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search profiles by name, email, skills, or project title
// Search for any match in the document
exports.searchProfiles = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ message: "Search query required" });

        const regex = new RegExp(q, "i"); // makes search insensitive
        const profiles = await Profile.find({
            $or: [ //or -> for a single contd. true
                { name: regex }, 
                { email: regex },
                { skills: regex },
                { "projects.title": regex },
                { "projects.description": regex }
            ]
        });

        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};