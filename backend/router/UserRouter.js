const router = require('express').Router();
const { validateToken } = require('../controller/JWT.js');
const {getHero,updateHero, deleteHero, createHero, getUser, createUser, updateUser, deleteUser, getAllUsers,} = require("../controller/UserController.js");

// Hero Routes
router.get('/hero',getHero);
router.post('/hero/create',validateToken,createHero);
router.patch('/hero/update',validateToken,updateHero);
router.delete('/hero/delete',validateToken,deleteHero);

// User Routes
router.get('/user',validateToken,getAllUsers)
router.get('/user/:id',validateToken,getUser)
router.post('/user/create',validateToken,createUser)
router.patch('/user/update',validateToken,updateUser)
router.delete('/user/delete/:id',validateToken,deleteUser)

module.exports = router