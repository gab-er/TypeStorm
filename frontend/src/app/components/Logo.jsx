import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LinkBox from './LinkBox'

const Logo = () => {

  //  <Link href="/" className="text-3xl"> 
  //        Type<span className="text-yellow-300">Storm</span> 
  //  </Link> }

  return (
      <Image  
      src = {`/images/TypeStormLogoLight.png`} 
      alt = "TypeStorm"
      width="200"
      height="200"> 
      </Image>
  )
}

export default Logo