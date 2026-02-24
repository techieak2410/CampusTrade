import express from 'express'
const router=express.Router();

import {
    getAllListings,
    getlistingById,
    getlistingByCategory,
    addListing,
    upadteListing,
    deleteListing
} from '../controllers/listing.controller.js'

import upload from '../middlewares/multer.middleware.js';

router.get('/',getAllListings);
router.get('/:id',getlistingById);
router.get('/category/:category',getlistingByCategory);
router.post('/',upload.single("imageName"),addListing);
router.put('/:id',upload.single("imageName"),upadteListing);
router.delete('/:id',deleteListing);

export default router;