import Link from "next/link"

const LinkBox = ({ href, children, width = "w-64", height = "h-32" }) => {
  return (
    <Link href={href}>
      <div className={`flex items-center justify-center rounded-lg cursor-pointer ${width} ${height}`}>
        {children}
      </div>
    </Link>
  )
}

export default LinkBox