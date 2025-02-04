// import Button from "../Utills/Button"; // Assuming Button is a reusable component

// const NoteCard = ({ note }) => {
//   const handleDelete = () => {
//     // Implement the logic to delete the note
//   };

//   const handleEdit = () => {
//     // Implement the logic to edit the note
//   };

//   const handleView = () => {
//     // Implement the logic to view the note details
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
//       <h3 className="text-lg font-semibold">{note.title}</h3>
//       <p className="text-gray-600">{note.content.slice(0, 100)}...</p>
//       <div className="mt-4 flex justify-between">
//       <Button onClick={() => handleEdit(note._id)} className="bg-blue-500 text-white">
//           View
//         </Button>
//         <Button onClick={() => handleView(note._id)} className="bg-yellow-500 text-white">
//           Edit
//         </Button>
//         <Button onClick={() => handleDelete(note._id)} className="bg-red-500 text-white">
//           Delete
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;





import Button from "../Utills/Button"; // Assuming Button is a reusable component

const NoteCard = ({ note, handleDelete, handleEdit, handleView }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
      <h3 className="text-lg font-semibold">{note.title}</h3>
      <p className="text-gray-600">{note.content.slice(0, 100)}...</p>
      <div className="mt-4 flex justify-between">
        <Button onClick={() => handleView(note._id)} className="bg-blue-500 text-white">
          View
        </Button>
        <Button onClick={() => handleEdit(note._id)} className="bg-yellow-500 text-white">
          Edit
        </Button>
        <Button onClick={() => handleDelete(note._id)} className="bg-red-500 text-white">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default NoteCard;