
import { useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { useState } from "react";
import NoteCard from "../Components/NoteCard";
import Input from "../Utills/Input";
import Button from "../Utills/Button";
import { Search, Filter } from "lucide-react";
import { customFetch } from "../Utills/customFetch";
import { Mic } from "lucide-react"; // Import Mic icon for the button

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/notes");
    return { notes: Array.isArray(data.notes) ? data.notes : [] };
  } catch (error) {
    console.error("Error fetching notes:", error);
    return { notes: [] };
  }
};

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const title = formData.get("title")?.trim() || "Untitled Note";
    const content = formData.get("content")?.trim();

    if (!content) {
      console.error("Content cannot be empty");
      return { error: "Content cannot be empty" };
    }

    const noteData = { title, content, isAudio: formData.get("isAudio") === "true" };

    const response = await customFetch.post("/notes", noteData, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding note:", error);
    return { error: "Failed to add note" };
  }
};

const HomePage = () => {
  const { notes = [] } = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [recording, setRecording] = useState(false);
  const [noteType, setNoteType] = useState("title"); // Can be either "title" or "content"
 


  // Initialize SpeechRecognition
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onstart = () => {
    setRecording(true);
    setAlertMessage(""); // Clear alert message when recording starts
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (noteType === "title") {
      setTitle(transcript); // Set the title as per the transcription
    } else {
      setContent(transcript); // Set the content as per the transcription
    }
  };

  recognition.onerror = (error) => {
    console.error("Speech recognition error:", error);
    setRecording(false);
    setAlertMessage("An error occurred with voice recognition.");
  };

  recognition.onend = () => {
    setRecording(false); // Reset the recording status once recognition ends
  };

  const handleDelete = async (noteId) => {
    try {
      // Send DELETE request to backend
      await customFetch.delete(`/notes/${noteId}`);
      
      // After deletion, fetch the updated notes (or fetch using the fetcher)
      // fetcher.load('/dashboard'); // Load the updated notes from the server
      navigate(`/dashboard`);
      // Optionally, provide an alert or feedback
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note.");
    }
  };
  

  const handleEdit = (noteId) => {
    // Navigate to the edit page, passing the noteId as a URL parameter
    navigate(`/dashboard/edit/${noteId}`);
  };

  const handleView = (noteId) => {
    // Navigate to the view page, passing the noteId as a URL parameter
    navigate(`/dashboard/view/${noteId}`);
  };

  const handleStartRecording = () => {
    recognition.start(); // Start recording
  };

  const handleStopRecording = () => {
    recognition.stop(); // Stop recording
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setAlertMessage("Note content cannot be empty!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title || "Untitled Note");
    formData.append("content", content);

    await fetcher.submit(formData, { method: "post" });

    setTitle("");
    setContent("");
    setAlertMessage("Note added successfully!");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
          </div>
          <Button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg flex items-center">
            <Filter size={18} className="mr-2" /> Sort
          </Button>
        </div>
      </div>

      {/* Notes List */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleView={handleView}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No notes found</p>
        )}
      </div>

      {/* Form to Add a New Note */}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 max-w-lg mx-auto">
        <Input
          name="title"
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          name="content"
          type="text"
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {/* Alert Message */}
        {alertMessage && (
          <div className="mt-4 text-center text-gray-500">
            <p>{alertMessage}</p>
          </div>
        )}

        <Button type="submit" className="bg-blue-500 text-white mt-4">
          Add Note
        </Button>
      </form>

      {/* Footer Mic Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-black py-2 px-4">
        <Button
          type="button"
          onClick={() => {
            if (!recording) {
              setNoteType("content");  // Set noteType to content for real-time transcription
              handleStartRecording();  // Start voice recognition
            } else {
              handleStopRecording();  // Stop voice recognition
            }
          }}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-full flex justify-center items-center"
        >
          <Mic size={24} className="mr-2" /> {recording ? "Stop Recording" : "Tap to Record"}
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
