"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';
import CodeEditorReg from '@/app/components/CodeEditorReg';


export default function Addnew() {
  const params = useParams();
  const id = params.id


  return (
    <>

      <div className="flex">
       
        <div className="flex-1 ml-48">
     

          <div className="pt-16 ">


            <div className="container mx-auto p-4">
              <CodeEditorReg name={`${id}`}/>
  
            </div>
          </div>
        </div>
      </div>

    </>

  );
}