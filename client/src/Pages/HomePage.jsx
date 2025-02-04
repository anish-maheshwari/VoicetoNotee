

// import { useLoaderData, Form, useFetcher } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "../Components/Navbar";
// import NoteCard from "../Components/NoteCard";
// import Input from "../Utills/Input";
// import Button from "../Utills/Button";
// import { Search, Filter, Mic } from "lucide-react";

// // 🔹 LOADER FUNCTION: Fetch Notes
// export const loader = async () => {
//   const response = await fetch("/api/v1/notes");
//   if (!response.ok) {
//     throw new Error("Failed to fetch notes");
//   }
//   return response.json();
// };

// // 🔹 ACTION FUNCTION: Add New Note
// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const newNote = Object.fromEntries(formData);
  
//   const response = await fetch("/api/v1/notes", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(newNote),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to add note");
//   }

//   return response.json();
// };

// const HomePage = () => {
//   const notes = useLoaderData();  
//   const fetcher = useFetcher(); // 🔹 For submitting data without reloading
//   const [searchQuery, setSearchQuery] = useState("");
//   const [recording, setRecording] = useState(false);

//   // 🔹 Speech-to-Text Function
//   const startRecording = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Your browser does not support speech recognition.");
//       return;
//     }

//     const speechRecognition = new window.webkitSpeechRecognition();
//     speechRecognition.continuous = false;
//     speechRecognition.interimResults = false;
//     speechRecognition.lang = "en-US";
//     speechRecognition.maxAlternatives = 1;

//     speechRecognition.onstart = () => setRecording(true);
//     speechRecognition.onend = () => setRecording(false);

//     speechRecognition.onresult = async (event) => {
//       const transcript = event.results[0][0].transcript;
      
//       // 🔹 Send to backend using React Router's action
//       const formData = new FormData();
//       formData.append("title", "Audio Note");
//       formData.append("content", transcript);
      
//       await fetcher.submit(formData, { method: "post" });
//     };

//     speechRecognition.start();
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />
      
//       {/* Search Bar */}
//       <div className="container mx-auto p-6">
//         <div className="flex items-center gap-4">
//           <div className="relative flex-1">
//             <Input
//               type="text"
//               placeholder="Search notes..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//               <Search size={20} />
//             </div>
//           </div>
//           <Button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg flex items-center">
//             <Filter size={18} className="mr-2" /> Sort
//           </Button>
//         </div>

//         {/* Notes List */}
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {notes.length > 0 ? (
//           notes.map((note) => (
//             <div key={note._id}>
//               <NoteCard note={note} />
//               <Link to={`/dashboard/edit/${note._id}`}>
//                 <Button className="bg-blue-500 text-white mt-2">Edit</Button>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">No notes found</p>
//         )}
//       </div>
//     </div>

//       {/* Form to Add a New Note */}
//       <Form method="post" className="mt-6 flex flex-col gap-4 max-w-lg mx-auto">
//         <Input name="title" type="text" placeholder="Note Title" required />
//         <Input name="content" type="text" placeholder="Note Content" required />
//         <Button type="submit" className="bg-blue-500 text-white">Add Note</Button>
//       </Form>

//       {/* 🔹 Speech-to-Text Button */}
//       <div className="mt-4 text-center">
//         <Button onClick={startRecording} className={`px-4 py-2 rounded-full ${recording ? "bg-red-500" : "bg-gray-500"}`}>
//           <Mic size={20} className="mr-2" /> {recording ? "Recording..." : "Record"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default HomePage;



// import { useLoaderData, Form, useFetcher } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Navbar from "../Components/Navbar";
// import NoteCard from "../Components/NoteCard";
// import Input from "../Utills/Input";
// import Button from "../Utills/Button";
// import { Search, Filter, Mic } from "lucide-react";
// import Cookies from "js-cookie";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';  // to access cookies
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isProcessing, setIsProcessing] = useState(false); // To manage processing state
  const navigate = useNavigate();

  // Get the token from the cookies (make sure it's stored there after login)
  const token = Cookies.get('token');  // Assuming the token is stored in 'token' cookie
  // console.log('Token:', token); 
  // Fetch notes from the backend when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5100/api/v1/notes', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    if (token) {
      fetchNotes();  // Only fetch notes if there's a valid token
    }
  }, [token]);

  // Handle input changes for new note
  const handleChange = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  // Handle note creation
  const handleAddNote = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await axios.post('http://localhost:5100/api/v1/notes', newNote, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      });
      // Reload notes after adding a new one
      const response = await axios.get('http://localhost:5100/api/v1/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
      setNewNote({ title: '', content: '' }); // Clear the form
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle note deletion
  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5100/api/v1/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the note from state without needing to re-fetch
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Handle note editing
  const handleEditNote = (id) => {
    navigate(`/dashboard/edit/${id}`); // Navigate to the edit page
  };

  return (
    <div className="home-page">
      <h2>Your Notes</h2>

      {/* Show message if no notes are available */}
      {notes.length === 0 ? (
        <p>You have no notes yet. Add a new note!</p>
      ) : (
        <ul>
          {notes.map(note => (
            <li key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleEditNote(note._id)}>Edit</button>
              <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAddNote}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newNote.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={newNote.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={isProcessing}>
            {isProcessing ? 'Adding...' : 'Add Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
