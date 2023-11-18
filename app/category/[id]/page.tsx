"use client"

import { useParams } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';
import { buttonVariants } from "@/components/ui/button";
import { AddNewComponent } from '@/app/components/AddNewComponent';
import { DeleteComponent } from './components/DeleteComponent';
import { Spinner } from '@/app/components/Spinner';
import Link from 'next/link';

interface IComponent {
  id: string;
  name: string;
  category: string;
  code: string
}


const Category = () => {

  const params = useParams();
  const id = params.id
  const [backendData, setBackEndData] = useState<IComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const [newComponent, setNewComponent] = useState();
  //const [componentDelete, setComponentDelete] = useState<boolean>();

  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);


  useEffect(() => {
    setLoading(true);
    fetch(`/api/components-category/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then(data => {
        if (Array.isArray(data.category)) {
          console.log(data.category)
          setBackEndData(data.category)
          setLoading(false);


        } else {
          console.warn("Received data is not an array", data);

        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [newComponent]);


  const NewComponentAdded = (props: any) => {
    setNewComponent(props)
  }



  return (
    <>

      <div className="flex">
       
        <div className="flex-1 ml-48">
      

          <div className="pt-16 ">

            <div className="container mx-auto p-4">
              <div className="text-center mb-3">
                <AddNewComponent onSubmit={NewComponentAdded} name={id} />
              </div>

              {loading ?
                <Spinner />


                :

                <div className="grid grid-cols-3 gap-4 content-center">
                  {backendData.map((item) => (
                    <div key={item.id}>
                      <iframe className='border-2 w-full h-72' src={`data:text/html;charset=utf-8,${encodeURIComponent("<script src='https://cdn.tailwindcss.com'></script>" + item.code)}`}
                        ref={setContentRef}></iframe>
                      <div className="grid grid-cols-2 gap-3 content-left">
                        <Link className={buttonVariants({ variant: "linkfull" })} href={`/component/${item.id}`}>SELECT</Link>
                        <DeleteComponent onClick={NewComponentAdded} id={item.id} />
                      </div>
                    </div>
                  ))}
                </div>
              }
            </div>

          </div>
        </div>
      </div>

    </>


  )
}
export default Category