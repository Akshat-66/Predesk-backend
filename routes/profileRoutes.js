const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware'); // adjust path if needed

// Apply protect to all routes
router.use(protect);

// Extra queries
router.get('/search', profileController.searchByAny);         
router.get('/projects', profileController.getProjectsBySkill);   
router.get('/skills/top', profileController.getTopSkills);       

// CRUD
router.post('/', profileController.createProfile);          
router.get('/', profileController.getProfiles);             
router.get('/:email', profileController.getProfileByEmail);       
router.put('/:email', profileController.updateProfileByEmail);        
router.delete('/:email', profileController.deleteProfileByEmail);  

module.exports = router;
