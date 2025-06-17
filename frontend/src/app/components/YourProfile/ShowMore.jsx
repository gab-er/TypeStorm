

const ShowMore = ({less, more, display, setDisplay}) => {
  return (
    <button className="font-semibold text-indigo-600 hover:text-indigo-500" 
            onClick= {display == less?()=>setDisplay(more): ()=>setDisplay(less)}>
                  {display == 5? "Show More":"Show Less"}
    </button>
  )
}

export default ShowMore