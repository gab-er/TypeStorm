"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import FetchHistory from "./FetchHistory";
import useHistoryStore from "@/app/stores/useHistoryStore";
const PageButton = ({firstEntry,lastEntry}) => {
  const page  = useHistoryStore((state)=>state.page)
  const lastPage = useHistoryStore((state)=>state.lastPage)
  console.log(lastPage)
  return(
    <div className="flex justify-center items-center gap-8 text-center p-4">
                {page==1?<></>:<button className="font-bold text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  FetchHistory(firstEntry.id,true)}}>
                  <ArrowLeftIcon className="size-10"/>
                </button>}
                {page==lastPage?<></>:<button className="font-bold text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  FetchHistory(lastEntry.id,false)}}  >
                  <ArrowRightIcon className="size-10"/>
                </button>}
    </div>
  )
  
}

export default PageButton