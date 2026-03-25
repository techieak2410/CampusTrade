import express from 'express';
const router=express.Router();

import {
    getAllUsers,
    getUserById,
    registerUser,
    deleteUser,
    updateUser,
    getUserByDiffField,
    loginuser
} from '../controllers/user.controller.js'

router.get('/',getAllUsers);
router.get('/:id',getUserById); 
router.get('/diff/:parameter',getUserByDiffField);
router.post('/register',registerUser);
router.post('/login',loginuser);
router.delete('/:id',deleteUser);
router.put('/:id',updateUser);

export default router;
