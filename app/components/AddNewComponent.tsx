import { Button } from "@/components/ui/button"
import { useState, FC } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Plus, Loader2 } from 'lucide-react';
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

export function AddNewComponent(props: any) {
  const { toast } = useToast();

  const [name, setName] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);

  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setName(name);
    postData()

  };

  const postData = async () => {
    setLoading(true);

    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/components/addnew`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + YOUR_TOKEN,  // if you need to send a token
        },
        body: JSON.stringify({ name, category: props.name, userId: props.userId }) // body data type must match "Content-Type" header
      });

      // Parsing the JSON response
      const data = await response.json();
      setLoading(false);

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


  if(!process.env.NEXT_PUBLIC_BASE_API_URL){
    return null
  }

  return (
    <form onSubmit={handleSubmit} id="my-form1">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex justify-end">

          <DialogTrigger asChild>
            <Button className="justify-self-end" variant="outline"> <Plus /> </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Component</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
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
            {loading ?
              <div>

                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              </div>
              :


              <Button type="submit" form="my-form1" >Save changes</Button>
            }

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  )
}