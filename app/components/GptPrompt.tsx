import { Button } from "@/components/ui/button"
import { useState, FC } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Bot } from 'lucide-react';

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

export function GptPrompt(props: any) {
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

        const code = {
            name: name,
            code: props.data
        };
        console.log(code);

        try {
            const response = await fetch('/api/gpt/basic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + YOUR_TOKEN,  // if you need to send a token
                },
                body: JSON.stringify(code) // body data type must match "Content-Type" header
            });

            //Parsing the JSON response
            const data = await response.json();
            setLoading(false);
            //   setData(data);

            setOpen(false);
            props.onSubmit(data);
            //   toast({
            //     description: 'New Component Added',
            //   })

            // Do something with the data
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };




    return (
        <form onSubmit={handleSubmit} id="my-form">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Bot className="mt-2 hover:text-red-500 m-2 transition duration-200 ease-in-out cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Improve The Componenet</DialogTitle>
                        <DialogDescription>
                            Write Changes To your Component .
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Prompt
                            </Label>
                            <Input onChange={handleChange} id="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">

                        </div>
                    </div>
                    <DialogFooter>
                        {loading &&
                            <div className="flex mr-5 mt-3">
                                <p className="mr-3"> Improving Please Wait...</p>
                                <Bot className="animate-bounce w-6 h-6"></Bot>
                                
                            </div>
                        }

                        <Button type="submit" form="my-form" >Make Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </form>
    )
}