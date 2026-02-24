import express from 'express'
import Listing from '../models/listing.model.js'
import mongoose from 'mongoose';
import { uploadOnCloudinary } from '../middlewares/cloudinary.middleware.js';

export async function getAllListings(req,res){
    try {
        // console.log("check\n\n\n");
        const listingAllDetails=await Listing.find();
        if(!listingAllDetails){
            return res.status(400).send("Cannot Find Listings");
        }
        return res.status(200).send(listingAllDetails);
    } catch (error) {
        console.log(error)
    }
}

export async function getlistingById(req,res){
    try {
        const {id}=req.params;
        console.log(id);
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send("Invalid Id");
        }
        const listingById=await Listing.findOne({_id:id});
        console.log(listingById);
        if(!listingById){
            return res.status(400).send("cannot find Listing with given Id");
        }
        return res.status(200).send(listingById);
    } catch (error) {
        console.log(error);
    }
}

export async function getlistingByCategory(req,res){
    try {
        const {category}=req.params;
        const listingBycategory=await Listing.find({category:category});
        if(!listingBycategory){
            return res.status(400).send("cannot find Listing with given category");
        }
        return res.status(200).send(listingBycategory);
        
    } catch (error) {
        console.log(error);
    }
}

export async function addListing(req, res) {
    try {
        const toAddListing = req.body;

        if (req.file) {
            const imageLocalpath = req.file.path;
            const cloudinaryResponse = await uploadOnCloudinary(imageLocalpath);
            if (!cloudinaryResponse) {
                return res.status(500).send("Image upload failed");
            }
            toAddListing.imageName = cloudinaryResponse.secure_url;
        }
        const addedListing = await Listing.create(toAddListing);

        return res.status(200).json(addedListing);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong");
    }
}

export async function upadteListing(req,res){
    try {
        const {id}=req.params;
        const toAddListing=req.body;
        if(req.file){
            toAddListing.imageName=req.file.path;
        }
        const addedListing=await Listing.findOneAndUpdate({_id:id},toAddListing,{returnDocument:'after'});
        return res.status(200).send(addedListing);
    } catch (error) {
        console.log(error);
    }
}

export async function deleteListing(req,res){
    try {
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send("Invalid Id");
        }
        const listingById=await Listing.findOneAndDelete({_id:id});
        if(!listingById){
            return res.status(400).send("cannot find Listing with given Id");
        }
        return res.status(200).send(listingById);
    } catch (error) {
        console.log(error)
    }
}


// router.get('/',getAllListings);
// router.get('/:id',getlistingById);
// router.get('/:category',getlistingByCategory);
// router.post('/',upload.single("imageName"),addListing);
// router.put('/:id',upload.single("imageName"),upadteListing);
// router.delete('/:id',deleteListing);
