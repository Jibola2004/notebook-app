import { NotebookProvider } from "./contexts/NotebookContext"
import Notebook from "./pages/Notebook"

import { Toaster } from 'sonner';



const App = () => {
  return (
    
       <NotebookProvider>
        <Toaster richColors position="top-right" />
       <Notebook/>
       </NotebookProvider>

  )
}

export default App