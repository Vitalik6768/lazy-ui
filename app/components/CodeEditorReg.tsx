"use client";


const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
import { useState, useEffect, ChangeEvent, FC } from 'react';


interface IComponent {
  id: number;
  name: string;
  category:string;
  code:string
}

interface ComProps {
  name: string;
}


const CodeEditorf:FC<ComProps> = (prompts) => {
  
  const [backendData, setBackEndData] = useState<IComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState('')

  console.log(prompts.name)
    
  
    
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);

  const addContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };


  useEffect(() => {
    fetch('/api/components/' + prompts.name)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then(data => {
        if (Array.isArray(data.component)) {
          //console.log(data.component[0].code);
          setBackEndData(data.component[0].code);
          setText("<script src='https://cdn.tailwindcss.com'></script>" + data.component[0].code);
        } else {
          console.warn("Received data is not an array", data);

        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

    useEffect(() => {
      if (backendData.length > 0) {
        console.log(backendData);
      console.log(backendData[0]);
  
      if (contentRef?.contentWindow) {
        const iframeDoc = contentRef.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(text);  // Be cautious about potential XSS vulnerabilities
        iframeDoc.close();
      }
    }
    }, [text, contentRef, backendData]);

  return (
    <div className="h-96 grid grid-cols-2 gap-4 content-center">
        <textarea className='border-2 w-full h-96'
          value={text}
          onChange={addContent}
        ></textarea>
        <iframe className='border-2 w-full h-96' ref={setContentRef}></iframe>
    </div>
  );
}

export default CodeEditorf