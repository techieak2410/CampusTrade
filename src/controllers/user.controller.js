import express from "express";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export async function getAllUsers(req,res){
    try{
        const allUser=await User.find();
        console.log(allUser)
        if(allUser.length===0){
            return res.status(200).send("No Users Found...");
        }
        return res.status(200).send(allUser);

    }catch(error){
        console.log(error);
    }
}

export async function getUserById(req,res){
    try{
        const {id}=req.params;
        
        const userdetails=await User.findOne({_id:id});
        if(!userdetails){
            return res.status(200).send("User Not Found");
        }
        return res.status(200).send(userdetails);
    }catch(error){
        console.log(error);
    }
}

export async function getUserByDiffField(req,res){
    try{
        const id=req.params;
        console.log(id);

    }catch(error){
        console.log(error);
    }
}

export async function addUser(req,res){
    try{
        console.log(`Got here`);
        const userdetails=req.body;
        console.log(req.body);
        const newUser=await User.create(userdetails);
        if(!newUser){
            return res.status(400).send("cannot create User");
        }
        return res.status(200).send(newUser);
    }catch(error){
        console.log(error);
    }
}

export async function deleteUser(req,res){
    try{
        const {id}=req.params;
        const userdetails=await User.findOneAndDelete({_id:id});
        if(!userdetails){
            return res.status.send("Error while fectching user data");
        }
        return res.status(200).send(userdetails);
    }catch(error){
        console.log(error);
    }
}

export async function updateUser(req,res){
    try{
        const {id}=req.params;
        const newUserdetails=req.body;
        const updatedUserDetails=await User.findOneAndUpdate({_id:id},newUserdetails,{returnDocument:'after'});
        if(!updatedUserDetails){
            return res.status(400).send("Cannot Up[date user Details");
        }
        return res.status(201).send(updatedUserDetails);
    }catch(error){
        console.log(error);
    }
}


// router.get('/',getAllUsers);
// router.get('/:id',getUserById);
// router.get('/:searchfield',getUserByDiffField);
// router.post('/',addUser);
// router.delete('/:id',deleteUser);
// router.put('/:id',updateUser);