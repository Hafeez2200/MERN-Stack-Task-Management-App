import React from "react";

const TaskCard = ({ data,seteditTaskId,seteditTaskDiv }) => {

  const showEditDiv = (e,id)=>{
    e.preventDefault();
    window.sessionStorage.setItem("editTaskId",id);
    seteditTaskId(id);
    seteditTaskDiv("block");
  }

  return (
    <button
    onClick={(event) => showEditDiv(event,data._id)} 
    className=" bg-white rounded-md px-4 w-[100%] shadow-md py-2 hover:shadow-2xl transition-all duration-300 ">
      <div className=" flex items-center justify-between">
        <h1 className="">{data.title}</h1>
        <div
          className={`text-sm font-bold ${
            data.priority === "low"
              ? "text-green-500 bg-green-100"
              : data.priority === "medium"
              ? "text-yellow-500 bg-yellow-100"
              : "text-red-500 bg-red-100"
          }  px-2 py-1 rounded-full`}
        >
          <p> {data.priority} </p>
        </div>
      </div>
      <hr className=" my-2" />
      <p className=" text-sm text-zinc-500 text-start">{data.description}</p>
    </button>
  );
};

export default TaskCard;
