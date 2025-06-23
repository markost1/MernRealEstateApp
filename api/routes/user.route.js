import express from 'express'
import { deleteUser, getUser, getUserListings, test, test2, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router()

router.get('/test', test)
router.get('/test2', test2)
router.post('/update/:id',verifyToken, updateUser)
router.delete('/delete/:id',verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings )
router.get('/:id',verifyToken,getUser)

export default router;