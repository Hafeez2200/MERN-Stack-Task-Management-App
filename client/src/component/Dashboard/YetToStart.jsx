
import React from 'react'
import TaskCard from './TaskCard'

const YetToStart = ({task,seteditTaskId,seteditTaskDiv}) => {
  return (
    <div className=' flex flex-col gap-5'>

      {task && task.map((items,i)=>{
        return <TaskCard key={i} data={items} seteditTaskId= {seteditTaskId} seteditTaskDiv ={seteditTaskDiv} />
      }) }
        
    </div>
  )
}

export default YetToStart