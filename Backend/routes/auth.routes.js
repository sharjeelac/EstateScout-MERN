import express from 'express';
const router = express.Router();
import { register, login, logout, getUserProfile, updateUserProfile, deleteUser, refreshToken } from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

// user registration route
router.post('/register', register)

// user login route
router.post('/login', login)

// user logout route
router.post('/logout', logout)

router.post('/refresh', refreshToken);


// Get user profile
router.get('/:id', verifyToken, getUserProfile);

// Update user profile
router.put('/:id', verifyToken, updateUserProfile);

// Delete user
router.delete('/:id', verifyToken, deleteUser);

export default router;
