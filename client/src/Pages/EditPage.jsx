import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { customFetch } from "../Utills/customFetch";
import Input from "../Utills/Input";
import Button from "../Utills/Button";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await customFetch.get(`/notes/${id}`);
    return response.data.notes; // Assuming the response has 'notes' field
  } catch (error) {
    console.error("Error fetching note for edit:", error);
    return null;
  }
};

const EditPage = () => {
  const note = useLoaderData();
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { title, content };
      await customFetch.patch(`/notes/${note._id}`, formData);
      navigate("/dashboard"); // Redirect to the page that lists all notes after update
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  if (!note) return <p>Note not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Edit Note</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto">
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
          <Button type="submit" className="bg-blue-500 text-white">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
