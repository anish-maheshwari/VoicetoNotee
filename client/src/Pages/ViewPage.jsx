import { useLoaderData } from "react-router-dom";
import { customFetch } from "../Utills/customFetch";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await customFetch.get(`/notes/${id}`);
    return response.data.notes; // Assuming the response has 'notes' field
  } catch (error) {
    console.error("Error fetching note for view:", error);
    return null;
  }
};

const ViewPage = () => {
  const note = useLoaderData();

  if (!note) return <p>Note not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">View Note</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">{note.title}</h2>
          <p>{note.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
