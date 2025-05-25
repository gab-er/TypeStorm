import React from 'react'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="text-3xl"> 
        Type<span className="text-yellow-300">Storm</span> 
    </Link>
  )
}

export default Logo