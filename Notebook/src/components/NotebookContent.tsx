import { useState } from "react";
import { useNotebook } from "../contexts/NotebookContext";
import { toast } from "sonner";

type Notebook = {
  title: string;
  date: string;
  content: string;
  user_id:number;
  id?:number;
};

const NotebookContent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {addNotebook,isLoggedIn,user_id}=useNotebook()
  
  const handleSave = () => {
    console.log('user_id:',user_id);
    const newNotebook: Notebook = {
      title,
      date: new Date().toISOString().split("T")[0],
      content,
      user_id:user_id,
    };
    if (title && content && isLoggedIn){
      toast.success('Notebook added successfully.')
      addNotebook(newNotebook);
       setTitle("");
       setContent("");
    }
    else if(!isLoggedIn){
      toast.warning('not authenticated, Login please.')
    }
    else {
      toast.warning('content and title have must have not be empty.')
    }
    
  };

  return (
    <div className="flex-grow max-w-4xl flex flex-col bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl h-[calc(100vh-2rem)] gap-6 p-6 border border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center text-gray-800">
        <p className="text-sm">📅 Date: {new Date().toDateString()}</p>
        <div className="space-x-3 flex items-center">
          <label htmlFor="title" className="text-sm font-semibold">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-100 text-gray-700 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Notebook Title"
          />
        </div>
      </div>

      {/* Notepad Area */}
      <div className="flex-grow w-full flex rounded-lg border border-gray-200 overflow-hidden bg-[repeating-linear-gradient(white, white_23px, #e5e7eb_24px)]">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-4 flex-grow text-[16px] bg-transparent resize-none outline-none font-mono text-gray-800"
          placeholder="Start writing your thoughts here..."
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="self-end px-4 py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Save Notebook
      </button>
    </div>
  );
};

export default NotebookContent;
