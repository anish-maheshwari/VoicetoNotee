import Note from "../models/noteModels.js"
import { StatusCodes } from 'http-status-codes';

import mongoose from 'mongoose';
import day from 'dayjs';

//custom error
import { NotFoundError } from "../errors/customError.js";

export const getAllnotes = async (req,res)=>{
  
  const notes = await Note.find({ createdBy: req.user.userId });
    res.status(200).json({notes});
};

export const createNote = async (req, res) => {

  req.body.createdBy = req.user.userId;

  console.log('User ID:', req.body.createdBy); // Log the userId to make sure it's being set properly
  const note = await Note.create(req.body);
 
  res.status(StatusCodes.CREATED).json({ note });
};

export const singleNote = async (req, res) => {
    const { id } = req.params;
    const notes = await Note.findById(id);

    res.status(200).json({ notes });
  };

  // Delete Job
  export const deleteNote = async (req, res) => {
    const { id } = req.params;
    const removedNote = await Note.findByIdAndDelete(id);
  
    res.status(200).json({ job: removedJob });
  };

  

  export const editNote = async (req, res) => {
    const { id } = req.params;
  
    const editedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  
    res.status(200).json({ note: editedNote });
  };






  
  
 