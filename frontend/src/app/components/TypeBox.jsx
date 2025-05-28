import React from 'react'
import { wordsData } from '@/lib/words'
import Word from './Word';

// const TypeBox = () => {
//   // style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px'}}>
//   // style = {{height: '50%', width:'50%', textAlign: "center"}}

//   const words = mostCommon100Words;

//   return (
//     <div className="flex justify-center h-screen mt-10">
//         <input className="flex mt-20 h-1/3 w-1/2 text-center" placeholder = "Placeholder Typing Bar">
//         </input>
//     </div>
//   )
// }

const TypeBox = () => {
  const words = wordsData;
  console.log(words);

  return (
    <div className="flex flex-wrap mx-auto w-[1000px] h-[200px] mt-40 gap-y-[1.5] gap-x-[0.25em]">
      { words.map((word) => 
        <Word key={word.key} word={word.value}/>
      )}
    </div>
  )
}

export default TypeBox