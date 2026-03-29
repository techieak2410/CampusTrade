import express from 'express'
import Listing from '../models/listing.model.js'
import mongoose from 'mongoose';
import { uploadOnCloudinary } from '../middlewares/cloudinary.middleware.js';

export async function getAllListings(req,res){
    try {
        const listingAllDetails=await Listing.find().populate("ownerId","name email");
        if (listingAllDetails.length === 0) {
            return res.status(404).send("No Listings Found");
        }
        return res.status(200).send(listingAllDetails);
    } catch (error) {
        return res.status(500).send("Server Error");
    }
}

export async function getListingById(req,res){
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
        return res.status(500).send("Server Error");
    }
}

export async function getListingByCategory(req,res){
    try {
        const {category}=req.params;
        const listingBycategory = await Listing.find({
            category: { $regex: new RegExp(`^${category}$`, "i") }
        });
        if (listingBycategory.length === 0) {
            return res.status(404).send("No Listings Found for this category");
        }
        return res.status(200).send(listingBycategory);
        
    } catch (error) {
        return res.status(500).send("Server Error");
    }
}

export async function addListing(req, res) {
    try {
        const toAddListing = {
            ...req.body,
            ownerId: req.user.id
        }
        console.log(req.body);

        if (req.file) {
            const imageLocalpath = req.file.path;
            console.log(imageLocalpath);
            const cloudinaryResponse = await uploadOnCloudinary(imageLocalpath);
            if (!cloudinaryResponse) {
                return res.status(500).send("Image upload failed");
            }
            toAddListing.imageName = cloudinaryResponse.secure_url;
        }
        const addedListing = await Listing.create(toAddListing);

        
        return res.status(200).json(addedListing);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function updateListing(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid Id");
        }
        
        const updateData = { ...req.body };
        if (req.file) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (!cloudinaryResponse) {
                return res.status(500).send("Image upload failed");
            }
            updateData.imageName = cloudinaryResponse.secure_url;
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            updateData,
            { returnDocument:'after' }
        );

        if (!updatedListing) {
            return res.status(404).send("Listing not found");
        }

        return res.status(200).json(updatedListing);

    } catch (error) {
        return res.status(500).send("Server Error");
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
        return res.status(500).send("Server Error");
    }
}

