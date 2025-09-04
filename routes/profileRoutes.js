const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController')


// Extra queries
router.get('/search', profileController.searchByAny);         // Search profiles
router.get('/projects', profileController.getProjectsBySkill);   // Get projects by skill
router.get('/skills/top', profileController.getTopSkills);       // Get top 10 skills



// CRUD
router.post('/', profileController.createProfile);          // Create Profile
router.get('/', profileController.getProfiles);             // Get all Profiles
router.get('/:email', profileController.getProfileByEmail);       // Get Profile by ID
router.put('/:email', profileController.updateProfileByEmail);        // Update Profile
router.delete('/:email', profileController.deleteProfileByEmail);  // Delete Profile



module.exports = router;