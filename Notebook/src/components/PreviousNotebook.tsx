import { useState } from "react";
import { useNotebook } from "../contexts/NotebookContext";
import EditNotebook from "./EditNotebook";
import { EditIcon, Trash2 } from "lucide-react";
import { DeleteNotebook } from "./DeleteNotebook";

const PreviousNotebook = () => {
  const { notebooks } = useNotebook();
  const [openNotebook, setOpenNotebook] = useState(false);
  const [selectedNotebookId, setSelectedNotebookId] = useState<number>(0);
  const [openDelete, setOpenDelete] = useState(false);

  const handleNotebookClick = (id: number) => {
    setSelectedNotebookId(id);
    setOpenNotebook(true);
  };

  const handleDeleteNotebook = (id: number) => {
    setSelectedNotebookId(id);
    setOpenDelete(true);
  };

  return (
    <>
      {/* Render DeleteNotebook dialog if open */}
      <DeleteNotebook
        id={selectedNotebookId}
        isOpen={openDelete}
        setIsOpen={setOpenDelete}
      />

      {openNotebook ? (
        <EditNotebook id={selectedNotebookId} close={setOpenNotebook} />
      ) : (
        <div className="flex-grow max-w-4xl flex flex-wrap bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl h-[calc(100vh-2rem)] gap-4 p-6 border border-gray-300">
          {notebooks.length !== 0 ? (
            notebooks.map((note) => (
              <div
                key={note.id}
                className="w-full max-w-[250px] h-fit rounded bg-green-100 p-4 shadow flex flex-col gap-1 justify-between cursor-pointer hover:bg-green-200 transition"
              >
                <div className="flex space-x-4 justify-end w-full">
                  <EditIcon onClick={() => handleNotebookClick(note.id ?? 0)} />
                  <Trash2 onClick={() => handleDeleteNotebook(note.id ?? 0)} />
                </div>
                <h2 className="text-lg font-semibold text-green-800">
                  {note.title}
                </h2>
                <p className="text-sm text-gray-600">📅 {note.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No Previous Notebooks</p>
          )}
        </div>
      )}
    </>
  );
};

export default PreviousNotebook;
