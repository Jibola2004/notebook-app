import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

type Notebook = {
  user_id: number;
  title: string;
  content: string;
  date: string;
  id?: number;
};

type NotebookContextType = {
  notebooks: Notebook[];
  addNotebook: (notebook: Notebook) => void;
  removeNotebook: (id: number) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  error: any;
  loading: boolean;
  showNotebooks: boolean;
  setShowNotebooks: (value: boolean) => void;
  findNotebook: (id: number) => Notebook | undefined;
  editNotebook: (id: number, updated: Partial<Notebook>) => void;
  fullname: string;
  user_id: number;
  setUser_id:any;
  handleLogout: () => void;
};

const NotebookContext = createContext<NotebookContextType | undefined>(undefined);

export const NotebookProvider = ({ children }: { children: ReactNode }) => {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showNotebooks, setShowNotebooks] = useState(false);
  const [fullname, setFullname] = useState("");
  const [user_id, setUser_id] = useState(0);

  function checkIfLoggedIn() {
    const stored = localStorage.getItem("user");
   
    if (stored) {
      const user = JSON.parse(stored);
      setUser_id(user.id);
      setFullname(user.fullname);
      setIsLoggedIn(true);
    }
  }

  useEffect(() => {
    checkIfLoggedIn();
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchNotebooks = async (user_id:number) => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/notebooks/getNotebooks/${user_id}`);
        if (!res.ok) throw new Error("Failed to fetch notebooks");
        const data = await res.json();
        setNotebooks(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchNotebooks(user_id);
    }
  }, [isLoggedIn]);




  const addNotebook = async (notebook: Notebook) => {
    try {
      const res = await fetch("http://localhost:3000/api/notebooks/createNotebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notebook }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to add notebook");
        return;
      }

      // Append the notebook with server-generated ID
      setNotebooks((prev) => [...prev, { ...notebook, id: data.id || undefined }]);
    } catch (error) {
      toast.error("Error in adding notebook");
      console.error("error:", error);
    }
  };

  const editNotebook = async (id: number, updatedNotebook: Partial<Notebook>) => {
    try {
      const res = await fetch(`http://localhost:3000/api/notebooks/updateNotebook/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editedNotebook: updatedNotebook }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.message || "Failed to edit notebook");
      }

      setNotebooks((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updatedNotebook } : note))
    );
    } catch (error) {
      toast.error("Error in editing notebook");
      console.error("error:", error);
    }
  };

  const findNotebook = (id: number): Notebook | undefined => {
    return notebooks.find((note) => note.id === id);
  };

  const removeNotebook = async (id: number) => {
   
    try {
      const res = await fetch(`http://localhost:3000/api/notebooks/deleteNotebook/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.message || "Failed to delete notebook");
      }
      setNotebooks((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      toast.error("Error in deleting notebook");
      console.error("error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <NotebookContext.Provider
      value={{
        notebooks,
        addNotebook,
        removeNotebook,
        isLoggedIn,
        setIsLoggedIn,
        error,
        loading,
        showNotebooks,
        setShowNotebooks,
        findNotebook,
        editNotebook,
        fullname,
        user_id,
        handleLogout,
        setUser_id,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
};

// Hook
export const useNotebook = () => {
  const context = useContext(NotebookContext);
  if (!context) {
    throw new Error("useNotebook must be used within a NotebookProvider");
  }
  return context;
};
