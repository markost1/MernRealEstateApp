import express from 'express'
import { test, test2, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router()

router.get('/test', test)
router.get('/test2', test2)
router.post('/update/:id',verifyToken, updateUser)


export default router;