// import express from 'express';
// import Note from '../models/noteModels.js';

// const router = express.Router();

// // Create a new note
// router.post('/notes', async (req, res) => {
//   try {
//     const { title, content, isAudio } = req.body;
//     const newNote = new Note({ title, content, isAudio });
//     await newNote.save();
//     res.status(201).json(newNote);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Edit an existing note
// router.put('/notes/:id', async (req, res) => {
//   try {
//     const { title, content, isAudio } = req.body;
//     const updatedNote = await Note.findByIdAndUpdate(
//       req.params.id,
//       { title, content, isAudio },
//       { new: true }
//     );
//     if (!updatedNote) {
//       return res.status(404).json({ message: 'Note not found' });
//     }
//     res.json(updatedNote);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Delete a note
// router.delete('/notes/:id', async (req, res) => {
//   try {
//     const deletedNote = await Note.findByIdAndDelete(req.params.id);
//     if (!deletedNote) {
//       return res.status(404).json({ message: 'Note not found' });
//     }
//     res.json({ message: 'Note deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;


import { Router} from "express";
const router = Router();
 import Note from '../models/noteModels.js';


import{getAllnotes,
    createNote,
    singleNote,
    editNote,
    deleteNote
} from "../controller/notesController.js"

    import { validateNoteInput,validateIdParam } from "../middleware/validationMiddleware.js";



    // router.get('/', getAllJobs);
// router.post('/', createJob);

router.route('/').get(getAllnotes).post(validateNoteInput,createNote);
router.route('/:id').get(validateIdParam,singleNote)
.patch(validateIdParam,validateNoteInput,editNote)
.delete(validateIdParam,deleteNote);

export default router;