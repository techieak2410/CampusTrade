import express from 'express';
const router = express.Router();

import {
    getAllUsers,
    getUserById,
    registerUser,
    deleteUser,
    updateUser,
    getUserByDiffField,
    loginuser,
    getCurrentUser
} from '../controllers/user.controller.js';

import { verifyJWT } from '../middlewares/auth.middleware.js';

// PUBLIC ROUTES
router.post('/register', registerUser);
router.post('/login', loginuser);

// PROTECTED ROUTES
router.get('/me', verifyJWT, getCurrentUser);
router.delete('/:id', verifyJWT, deleteUser);
router.patch('/:id', verifyJWT, updateUser);

// OTHER ROUTES
router.get('/diff/:parameter', getUserByDiffField);
router.get('/:id', getUserById);
router.get('/', getAllUsers);

export default router;