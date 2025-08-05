import express from 'express';
import multer from 'multer';
import {addNewVillageHandler, getAllVillagesHandler} from '../controllers/villageController.js'
import { authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: '../client/empowering-villages/public/uploads' });

router.post('/add-new-village',authorizeRole("Admin"),upload.single('image'), addNewVillageHandler);
router.get("/villages",authorizeRole("Admin"), getAllVillagesHandler);

export default router;
