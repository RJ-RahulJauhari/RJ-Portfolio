const router = require('express').Router();
const SkillsController = require('../controller/SkillsController');
const { validateToken } = require('../controller/JWT');

router.get('/get',SkillsController.getSkillByID);
router.get('/getUserSkills',SkillsController.getSkillsByUserID);
router.get('/getUserSkillsByCategory',SkillsController.getSkillsByUserIDAndCategory);

router.post('/add',validateToken,SkillsController.addSkill);
router.patch('/update',validateToken,SkillsController.updateSkill);
router.delete('/delete',validateToken,SkillsController.deleteSkill);

module.exports = router;