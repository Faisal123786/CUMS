import express from 'express';
import multer from 'multer';
import { authorizeRole } from '../middleware/authMiddleware.js';
import {addNewVillageHandler, getAllVillagesHandler,getAllVillageDetailHandler, getAllVillagesWithoutEmployeeIdHandler} from '../controllers/villageController.js'
import { getAllEmployeeHandler, registerEmployee } from '../controllers/employeeController.js';
import { getAllDonorEmplyeeAccepterCountHandler } from '../controllers/adminController.js';

const router = express.Router();
const upload = multer({ dest: '../client/empowering-villages/public/uploads' });

// village route

router.post('/add-new-village',authorizeRole("Admin"),upload.single('image'), addNewVillageHandler);
router.get("/villages",authorizeRole("Admin","Employee"), getAllVillagesHandler);
router.get("/village-detail/:id",authorizeRole("Admin","Employee"), getAllVillageDetailHandler);
router.get("/villages/unassigned", authorizeRole("Admin"), getAllVillagesWithoutEmployeeIdHandler);


// Employee route

router.post('/add-new-employee',authorizeRole("Admin"),registerEmployee)
router.get("/employee",authorizeRole("Admin"), getAllEmployeeHandler);

// Admin route

router.get("/getAllStatsCount",authorizeRole("Admin"), getAllDonorEmplyeeAccepterCountHandler);

export default router;
