import express from 'express';
const router = express.Router();

import { getPatientById,getAllPatients, updatePatient,addPatient, deletePatient,postImageToPatient} from '../controllers/patient.controller.js';
import {upload} from '../config/cloudinary.config.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

// POST /patients/create - Create new patient
router.post('/create',protectedRoute, upload.single('profileImage'), addPatient);

// DELETE /patients/:id - Delete patient
// router.delete('/:id', deletePatient);

// GET /patients - Get all patients
router.get('/getAllPatients', protectedRoute, getAllPatients);

// GET /patients/:id - Get patient by id
router.get('/:id', protectedRoute, getPatientById);

router.post(
  '/:id/upload',
  upload.single('skinImage'), // 'skinImage' matches the field name in FormData
  postImageToPatient
);

router.put('/:id/update', updatePatient);


export default router;

