"use client"

import { useState, FC } from 'react';
import { Settings, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";
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



export function SettingsNav() {
  const [name, setName] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('ok');

    event.preventDefault();
    setName(name);
    postData()
  };

  const postData = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/categories/4/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + YOUR_TOKEN,  // if you need to send a token
        },
        body: JSON.stringify({ name }) // body data type must match "Content-Type" header
      });

      // Parsing the JSON response
      const data = await response.json();
      setLoading(false);

      //setData(data);

      setOpen(false);
      toast({
        description: 'New Category Added Please Refresh The Page',
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
    <form onSubmit={handleSubmit} id="my-form">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild><h1 className="block py-2.5 cursor-pointer">Add New</h1></DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Category Name
              </Label>
              <Input
                onChange={handleChange}
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
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

              <Button type="submit" form="my-form">Save changes</Button>
            }
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>

  )
}