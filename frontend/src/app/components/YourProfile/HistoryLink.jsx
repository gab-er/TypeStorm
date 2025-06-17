import React from 'react'
import Link from "next/link";

const HistoryLink = () => {
  return (
    <Link href="/history" className="font-semibold text-indigo-600 hover:text-indigo-500 "> 
        Full History 
    </Link>
  )
}

export default HistoryLink