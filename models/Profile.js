const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    education: 
        { type: String, }
    ,
    skills: [
        {
            type: String,
        }
    ],
    projects: [
        {
            title: { type: String, required: true },
            description: { type: String },
            link: { type: String }
        }
    ],
    work: [
        {
            title: { type: String, required: true },
            description: { type: String },
        }
    ],
    links: {
        github: { type: String },
        linkedin: { type: String },
        portfolio: { type: String }
    }
}, { timestamps: true });


const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;