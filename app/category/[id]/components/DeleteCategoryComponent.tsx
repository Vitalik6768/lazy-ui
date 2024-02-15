import { Button } from "@/components/ui/button"
import { useState, FC } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Loader2 } from 'lucide-react';
const { routh } = require('@/utils/rouths')


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




export function DeleteCategoryComponent(props:any) {
  const { toast } = useToast();

  const [name, setName] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  const postData = async () => {
     setLoading(true);
  
    try {
      const response = await fetch(`${routh}/api/categories/${props.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + YOUR_TOKEN,  // if you need to send a token
        },
        body: JSON.stringify({  name, category:props.name  }) // body data type must match "Content-Type" header
      });

      // Parsing the JSON response
      const data = await response.json();
      setLoading(false);
      setOpen(false);
      props.onClick(props.id);
      toast({
        description: 'Category Deleted',
      })
      
      // Do something with the data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };




  return (
    
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <div className="flex items-center justify-self-end">
        <h1 className="mt-1">{props.name}</h1>
        <Trash2 className="text-red-500 mt-3 hover:text-red-700 m-2 transition duration-200 ease-in-out cursor-pointer justify-self-end"/>

        </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are You Sure?</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
            </div>
            <div className="grid grid-cols-4 items-center gap-4">

            </div>
          </div>
          <DialogFooter>
          {loading ?
              <div>

                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              </div>
              :
              <Button onClick={postData}>DELETE</Button>
            }

          </DialogFooter>
        </DialogContent>
      </Dialog>
    
  )
}