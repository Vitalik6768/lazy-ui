import { Button } from "@/components/ui/button"
import { useState, FC } from 'react';
import { useToast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddNewComponent(props:any) {
  const { toast } = useToast();

  const [name, setName] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    setName(name);
    postData()

  };

  const postData = async () => {
   // SetLoading(true);
    try {
      const response = await fetch('/api/components/addnew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + YOUR_TOKEN,  // if you need to send a token
        },
        body: JSON.stringify({  name, category:props.name  }) // body data type must match "Content-Type" header
      });

      // Parsing the JSON response
      const data = await response.json();
      //SetLoading(false);
      //setData(data);
 
      setOpen(false);
      props.onSubmit(data.message);
      toast({
        description: 'New Component Added',
      })
      
      // Do something with the data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };




  return (
    <form onSubmit={handleSubmit} id="my-form">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add New + </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Component</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input onChange={handleChange} id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">

            </div>
          </div>
          <DialogFooter>
            <Button type="submit" form="my-form" >Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  )
}