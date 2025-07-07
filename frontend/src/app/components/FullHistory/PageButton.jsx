"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import HandleScroll from "./HandleScroll";
import useHistoryStore from "@/app/stores/useHistoryStore";
const PageButton = ({firstEntry,lastEntry}) => {
  // get page and lastpage from history store
  const page  = useHistoryStore((state)=>state.page)
  const lastPage = useHistoryStore((state)=>state.lastPage)
  return(
    <div className="flex justify-center items-center gap-8 text-center p-4">
                {/*Previous button to get previous 50 games. Disable previous button if on first page */}
                {page==1?<></>:<button className="font-bold text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  HandleScroll(firstEntry.id,true)}}>
                  <ArrowLeftIcon className="size-10"/>
                </button>}
                {/*Next button to get next 50 games. Disable next button if on last page */}
                {page==lastPage?<></>:<button className="font-bold text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  HandleScroll(lastEntry.id,false)}}  >
                  <ArrowRightIcon className="size-10"/>
                </button>}
    </div>
  )
  
}

export default PageButton