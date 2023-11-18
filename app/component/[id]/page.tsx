"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';
import CodeEditorFinal from '@/app/components/CodeEditorFinal';


export default function Component() {
  const params = useParams();
  const id = params.id


  return (
    <>
      <div className="flex">

        <div className="flex-1 ml-48">

          <div className="pt-16 ">

            <div className="container mx-auto p-4">
              <CodeEditorFinal name={`${id}`} />

            </div>
          </div>
        </div>
      </div>
    </>

  );
}