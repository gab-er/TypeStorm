import React from 'react'

const Word = ({word}) => {
    // "select-none" prevents the text from being selected 
    // "ml-1 to add margin between each word"
  return (
    <div className="ml-2 text-3xl select-none opacity-80 text-white">
        {word}
    </div>
  )
}

export default Word