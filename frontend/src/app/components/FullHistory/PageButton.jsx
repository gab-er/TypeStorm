"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import FetchHistory from "./FetchHistory";
import useGameStore from "@/app/stores/useGameStore";
const PageButton = ({firstEntry,lastEntry, isLastPage}) => {
  const page  = useGameStore((state)=>state.page)
  const setPage  = useGameStore((state)=>state.setPage)
  return(
    <div className="flex justify-center items-center gap-8 text-center p-4">
                {page==1?<></>:<button className="font-bold text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  FetchHistory(firstEntry.id,true)}}>
                  <ArrowLeftIcon className="size-10"/>
                </button>}
                {isLastPage?<></>:<button className="font-bold text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  FetchHistory(lastEntry.id,false)}}  >
                  <ArrowRightIcon className="size-10"/>
                </button>}
    </div>
  )
  
}

export default PageButton