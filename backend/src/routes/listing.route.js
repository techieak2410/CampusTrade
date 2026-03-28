import express from 'express'
const router=express.Router();

import {
    getAllListings,
    getListingById,
    getListingByCategory,
    addListing,
    updateListing,
    deleteListing
} from '../controllers/listing.controller.js'

import upload from '../middlewares/multer.middleware.js';
import {verifyJWT} from "../middlewares/auth.middleware.js";

router.get('/',getAllListings);
router.get('/category/:category', getListingByCategory);
router.get('/:id', getListingById);
router.post('/',verifyJWT,upload.single("imageName"),addListing);
router.patch('/:id',verifyJWT,upload.single("imageName"),updateListing);
router.delete('/:id',verifyJWT,deleteListing);

export default router;