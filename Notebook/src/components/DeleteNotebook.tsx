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
import { useState } from "react";
import { useNotebook } from "@/contexts/NotebookContext";
import { toast } from "sonner";

export function DeleteNotebook({
  isOpen,
  setIsOpen,
  id,
}: {
  id: number;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [keyword, setKeyword] = useState("");
  const { removeNotebook } = useNotebook(); // Assuming this is defined in your context

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (parseInt(keyword) !== id) {
      toast.error("Keyword does not match notebook ID.");
      return;
    }

    try {
      await removeNotebook(id); // Call your API or context method
      //toast.success("Notebook deleted!");
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to delete notebook.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] text-neutral-100 bg-[url('/dark.jpg')] bg-center bg-cover">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
            <DialogDescription>Delete notebook</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <Label htmlFor="keyword">
                Enter <strong>{id}</strong> to delete this notebook
              </Label>
              <Input
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="outline"
              className="bg-red-500 hover:bg-red-600 transition"
              disabled={parseInt(keyword) !== id}
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
