import { useNotebook } from "../contexts/NotebookContext"

const Save = () => {
  const {showNotebooks:show,setShowNotebooks:setShow,fullname,handleLogout}=useNotebook()
  return (
     
    <div className="w-full flex flex-col gap-8">
        <div className="flex justify-between items-center my-4">
        <p className="text-neutral-100 text-2xl">{fullname||'guest'}</p>
        <img
        src="/profile.jpg"
        alt="Profile image"
        className="w-16 h-16 rounded-full shadow-md object-cover"/>
        </div>
        
        {
            !show ? 
            (    <>
                <button className="py-2 px-6 bg-yellow-300 hover:bg-yellow-400 w-full rounded text-bold text-white" onClick={()=>setShow(!show)}>View Previous Notebook</button>
                <button className="py-2 px-6 bg-red-500 hover:bg-red-600 w-full rounded text-bold text-white" onClick={handleLogout}>Logout</button>
                </>
            ):
            (
              <>
            <button className="py-2 px-6 bg-yellow-300 hover:bg-yellow-400 w-full rounded text-bold text-white" onClick={()=>setShow(!show)}>Add Notebook</button>
            <button className="py-2 px-6 bg-red-500 hover:bg-red-600 w-full rounded text-bold text-white" onClick={handleLogout}>Logout</button>
            </>
            )
        }
  
    </div>
  )
}

export default Save

