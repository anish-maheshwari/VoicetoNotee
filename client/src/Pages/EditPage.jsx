import { useFetcher, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "../Utills/Input";
import Button from "../Utills/Button";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updatedNote = Object.fromEntries(formData);

  const response = await fetch(`/api/v1/notes/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedNote),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  return response.json();
};

const EditPage = () => {
  const { id } = useParams();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchNote = async () => {
      const response = await fetch(`/api/v1/notes/${id}`);
      const data = await response.json();
      setNote(data);
    };
    fetchNote();
  }, [id]);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Edit Note</h1>
      <fetcher.Form method="post">
        <Input
          name="title"
          type="text"
          placeholder="Note Title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          required
        />
        <Input
          name="content"
          type="text"
          placeholder="Note Content"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          required
        />
        <Button type="submit" className="bg-green-500 text-white mt-4">Update Note</Button>
        <Button className="bg-red-500 text-white mt-2" onClick={() => navigate("/dashboard")}>
          Cancel
        </Button>
      </fetcher.Form>
    </div>
  );
};

export default EditPage;
