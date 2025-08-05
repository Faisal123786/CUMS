import express from 'express';
import { loginUser ,activateUser,registerUser, logout} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/activate/:id', activateUser);
router.post('/logout', logout);

export default router;
