import express from 'express';
import { test } from '../controlers/user.control.js';

const router=express.Router();
router.get('/test',test);
export default router;