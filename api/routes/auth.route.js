import express from 'express';
import {signup} from '../controlers/auth.control.js'

const router=express.Router();
router.post('/signup',signup);

export default router;