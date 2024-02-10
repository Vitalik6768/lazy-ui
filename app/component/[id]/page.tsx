"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Spinner } from '@/app/components/Spinner';
import CodeEditorFinal from '@/app/components/CodeEditorFinal';

export default function Component() {
  const params = useParams();
  const id = params.id;

  // Function to call when loading is complete, hides the spinner

  return (
    <>
      <div className="flex">
        <div className="flex-1 ml-48">
          <div className="pt-16">
            <div className="container mx-auto p-4">
  
                <CodeEditorFinal name={`${id}`}  />
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}