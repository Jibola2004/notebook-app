import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotebook } from "@/contexts/NotebookContext";
import { useState } from "react";
import { toast } from "sonner";

export function RegisterDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const {setIsLoggedIn,setUser_id}=useNotebook()


 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Submitted!");
  
  if (!username || !password ||!fullname) {
    toast.warning("Username and password are required");
    return;
  }

  if (password.length < 6) {
    toast.warning("Password should be at least 6 characters.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        fullname,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data?.message || "Register failed");
      return;
    }

    toast.success("New user Registered successful!");
    // Do something with the response, like saving token
    //localStorage.setItem("token", data.data);
    // ✅ Save id and fullname to localStorage
     const { id } = data.data;
     setUser_id(id);
     localStorage.setItem("user", JSON.stringify({ id, fullname }));
    
    setIsLoggedIn(true);
    setIsOpen(false);
  } catch (error) {
    toast.error("Something went wrong during User Registeration");
    console.error(error);
  }
}

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] text-neutral-100
       bg-[url('/dark.jpg')] bg-center bg-cover">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            <DialogDescription>Enter your details below</DialogDescription>
          </DialogHeader> 

          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <Label htmlFor="fullname">Fullname</Label>
              <Input
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Register</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
