import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isAudio: {
    type: Boolean,
    default: false,
  },
 
createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User2',
  },

},

{ timestamps: true });

const Note = mongoose.model("Note", noteSchema);

export default Note;
