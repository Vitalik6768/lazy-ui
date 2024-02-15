"use client"

import { useState, useEffect } from 'react';
const { routh } = require('@/utils/rouths')
const GenerateComponent = () => {

  const [promp, setPrompt] = useState<string | undefined>();
  const [data, setData] = useState<object | undefined>();
  const [loading, SetLoading] = useState<boolean | undefined>(false);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setPrompt(promp);
//     postData()

//   };


  const getData = async () => {
    SetLoading(true);
    try {
      const response = await fetch(`${routh}/api/prompts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Parsing the JSON response
      const data = await response.json();
      SetLoading(false);

      setData(data);
 // Do something with the data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };




    return(
    
    <h1>hello</h1>

    )


}

export default GenerateComponent
