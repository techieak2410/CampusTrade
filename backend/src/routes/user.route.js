import express from 'express';
const router=express.Router();

import {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    getUserByDiffField
} from '../controllers/user.controller.js'

router.get('/',getAllUsers);
router.get('/:id',getUserById); 
router.get('/:sic',getUserByDiffField);
router.post('/',addUser);
router.delete('/:id',deleteUser);
router.put('/:id',updateUser);

export default router;
