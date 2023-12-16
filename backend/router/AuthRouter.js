const router = require('express').Router();
const {login,register, loginAdmin, registerAdmin, logout, refetch} = require('../controller/AuthController');

router.post('/user/login',login);
router.post('/user/register',register);

router.post('/admin/login',loginAdmin);
router.post('/admin/register',registerAdmin)

router.get('/logout',logout);
router.get('/refetch',refetch)

module.exports = router;