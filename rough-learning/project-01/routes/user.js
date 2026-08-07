const express = require('express');
const router = express.Router();
const {handleGetAllUsers, handleGetUserById, handleCreateUser} = require('../controllers/user');    



router.get('/', handleGetAllUsers)
router.get('/:id', handleGetUserById)
router.post("/", handleCreateUser)


module.exports = router;