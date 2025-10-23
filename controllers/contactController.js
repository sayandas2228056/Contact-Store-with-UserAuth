//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const asyncHandler=require('express-async-handler');
const Contact=require('../models/contactModel');
const getContact = asyncHandler(async (req, res) => {
   const contacts=await Contact.find();
    res.status(200).json({message:"Get all contacts"});
});


const createContact=asyncHandler(async (req,res)=>{
    console.log("The request body is:",req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        name,
        email,
        phone
    });
    console.log("Contact:",contact);
    res.status(200).json({message:"Create a new contact"});
});

const updateContact=asyncHandler(async (req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    console.log("Updated Contact:",updatedContact);
    res.status(200).json({message:`Update a contact for ${req.params.id}`});
});

const getContactbyId=asyncHandler(async (req,res)=>{
        const contact= await Contact.findById(req.params.id);
        if(!contact){
            res.status(404);
            throw new Error("Contact not found");
        }
        res.status(200).json(contact);
});


const deleteContact=asyncHandler(async (req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json({message:`Delete contact for ${req.params.id}`});
});

module.exports = {getContact,createContact,updateContact,getContactbyId,deleteContact};