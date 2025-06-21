import express from 'express';
import { createListing, deleteListing, editListing, getListing, getListingData } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


router.post('/create',verifyToken, createListing)
router.delete('/delete/:id',verifyToken,deleteListing)
router.post('/edit/:id',verifyToken, editListing)
router.get('/get/:listingId',getListing)
router.get('/getListing/:listingId', getListingData )


export default router