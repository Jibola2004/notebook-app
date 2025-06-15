import { useEffect, useState } from "react";
import { useNotebook } from "../contexts/NotebookContext";
import { toast } from "sonner";

type Notebook = {
  id: number;
  title: string;
  date: string;
  content: string;
  user_id:number
};

const EditNotebook = ({id,close}:{id:any,close:any}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date,setDate]=useState("");
  const {findNotebook,editNotebook,user_id,isLoggedIn}=useNotebook();




  
   function loadNotebook(id:number){
     
      const notebook=findNotebook(id)
      if (!notebook) {
              // Handle the case where the notebook is not found
             console.error("Notebook not found");
             return;
                }
      const {title,content,date} =notebook
      setTitle(title)
      setDate(date)
      setContent(content)
   }
   useEffect(()=>{
    loadNotebook(id)
   },[])
   function handleEdit(){
    const editedNotebook: Notebook = {
      id:id,
      title:title,
      date:date,
      content:content,
      user_id,
    }
    if (title && content && isLoggedIn){
      toast.success('Notebook updated successfully.')
      editNotebook(id,editedNotebook);
       setTitle("");
       setContent("");
       setDate('')
       close(false)
    }
    else if(!isLoggedIn){
      toast.warning('not authenticated!,login please')
    }
     else {
      toast.warning('content and title have must have not be empty.')
    }

   }




  return (
    <div className="flex-grow max-w-4xl flex flex-col bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl h-[calc(100vh-2rem)] gap-6 p-6 border border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center text-gray-800">
        <p className="text-sm">📅 Date: {date}</p>
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

      <div className="space-x-3 w-full flex justify-end">
      <button
        onClick={()=>close(false)}
        className="self-end px-4 py-2 mt-4 bg-neutral-200 text-gray-600 rounded hover:bg-neutral-300 transition"
      >
        Cancel
      </button>
      {/* Save Button */}
      <button
        onClick={handleEdit}
        className="self-end px-4 py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Edit Notebook
      </button>
      </div>
    </div>
  );
};

export default EditNotebook;
