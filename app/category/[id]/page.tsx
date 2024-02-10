"use client"

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';
import { buttonVariants } from "@/components/ui/button";
import { AddNewComponent } from '@/app/components/AddNewComponent';
import { DeleteComponent } from './components/DeleteComponent';
import { DeleteCategoryComponent } from './components/DeleteCategoryComponent';
import { Spinner } from '@/app/components/Spinner';
import { Eye, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from 'next-auth/react';


interface IComponent {
  id: string;
  name: string;
  category: string;
  views: number;
  likes: number;
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
  const session = useSession();

  //const [componentDelete, setComponentDelete] = useState<boolean>();

  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const router = useRouter();


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
          console.log(session);
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

  const DeleteCategory = () => {

    console.log("category deleted")
    router.push('/');
  }



  return (
    <>

      <div className="flex">


        <div className="flex-1 ml-32">

          <div className="pt-16 ">

            <div className="container mx-auto p-4">
              {session.status === "authenticated" && (

                <div className="grid grid-cols-2 mb-4">
                  <AddNewComponent onSubmit={NewComponentAdded} name={id} userId={session.data?.user.email} />
                  <DeleteCategoryComponent onClick={DeleteCategory} name={id} />

                </div>
              )}


              {loading ?
                <div>

                  <div className="grid grid-cols-3 gap-4 content-center">
                    <Skeleton className="border-2 w-full h-72 hover:border-4 cursor-pointer" />

                  </div>
                  <Skeleton className="h-4 w-[200px] mt-4" />
                  <Skeleton className="h-4 w-[200px] mt-4" />

                </div>

                :

                <div className="grid grid-cols-3 gap-4 content-center">
                  {backendData.map((item) => (
                    <div key={item.id}>

                      <Link href={`/component/${item.id}`}>
                        <Image className='border-2 w-full h-72 hover:border-4 cursor-pointer"'
                          src={`/uploads/blob-${item.id}.png`}
                          width={500}
                          height={500}
                          alt={item.id}
                        />
                      </Link>

                      <div className="grid grid-cols-3">
                        <div className="flex items-center mt-3">
                          <Eye /> {/* Your icon */}
                          <span className='ml-2'>{item.views}</span>
                        </div>
                        <div className="flex items-center mt-3 ">
                          <Heart />
                          <span className='ml-2'>{item.likes}</span>
                        </div>
                        {session.status === "authenticated" && (
                          <div className="mt-1 mr-5">
                            <DeleteComponent onClick={NewComponentAdded} id={item.id} />
                          </div>
                        )
                        }
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