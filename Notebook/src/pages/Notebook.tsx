
import Auth from "../components/Auth";
import NotebookContent from "../components/NotebookContent";
import Save from "../components/Profile";
import PreviousNotebook from "../components/PreviousNotebook";
import { useNotebook } from "../contexts/NotebookContext";

const Notebook = () => {
    const {isLoggedIn,showNotebooks}=useNotebook()
   

  return (
    <div className="bg-[url('/wood-background.jpg')] bg-center bg-cover h-screen p-4 flex-col md:flex-row flex w-full md:justify-center md:items-start gap-8">
      
        
        {
            showNotebooks ? (<PreviousNotebook/>)
            :(<NotebookContent/>)
        }
      

      <div className="md:w-[300px] w-full flex flex-col gap-6 backdrop-blur-md bg-white/70 border border-gray-200 h-fit rounded-xl shadow-xl p-4 justify-between">
        {
            isLoggedIn ? (<Save />):(<Auth /> ) 
        }
      </div>
    </div>
  );
};

export default Notebook;
