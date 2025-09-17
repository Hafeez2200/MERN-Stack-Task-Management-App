import React, { useEffect, useState } from "react";
import axios from "axios";

const EditTask = ({seteditTaskDiv,editTaskId,fetchuserDetails}) => {
    
  const [values, setvalues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "yetToStart",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setvalues({
      ...values,
      [name]: value,
    });
  }

  const fetchDetailsofTask = async ()=>{
        try {
          const res = await axios.get(`http://localhost:1000/api/v1/getTask/${editTaskId}`,{
            withCredentials : true
          });
          setvalues(res.data.taskDetails);
        } catch (error) {

          
        }
    }
  
  useEffect(()=>{
    if(editTaskId){
        fetchDetailsofTask();
        console.log(editTaskId);
    }
    
  },[editTaskId])

  async function editTask(e,id) {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:1000/api/v1/editTask/${id}`,
        values,
        {
          withCredentials: true,
        }
      );
      alert(res.data.success);

      if (res.data.success) {
        fetchuserDetails();
        setvalues({
          title: "",
          description: "",
          priority: "low",
          status: "yetToStart",
        });
        seteditTaskDiv("hidden");
        window.sessionStorage.removeItem("editTaskId");
      }
    } catch (error) {
      alert(error.res.data.error);
    }
  }
  
   async function deleteTask(e,id) {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:1000/api/v1/deleteTask/${id}`,
        
        {
          withCredentials: true,
        }
      );
      alert(res.data.success);

      if (res.data.success) {
        fetchuserDetails();
        setvalues({
          title: "",
          description: "",
          priority: "low",
          status: "yetToStart",
        });
        seteditTaskDiv("hidden");
        window.sessionStorage.removeItem("editTaskId");
      }
    } catch (error) {
      alert(error.res.data.error);
    }
  }
  

  return (
    <div className=" bg-white rounded px-4 py-4 w-[40%]">
      <h1 className=" text-center font-semibold text-xl">Edit Task</h1>
      <hr className=" mb-4 mt-2" />

      <form className=" flex flex-col gap-4" onSubmit={(e)=>editTask(e,values._id)} >
        {/* Title*/}
        <input
          required
          type="text"
          placeholder="Title"
          name="title"
          className=" border px-2 py-1 rounded border-zinc-300 outline-none"
          value={values.title}
          onChange={onChange}
        />
        <div className=" flex items-center justify-between gap-4">
          {/* priority*/}
          <div className=" w-full">
            <h3 className=" mb-2">Select Priority</h3>
            <select
              name="priority"
              id=""
              className=" w-full border px-2 py-1 rounded border-zinc-300 outline-none"
              value={values.priority}
              onChange={onChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* status*/}
          <div className=" w-full">
            <h3 className=" mb-2">Select Status</h3>
            <select
              name="status"
              id=""
              className=" w-full border px-2 py-1 rounded border-zinc-300 outline-none"
              value={values.status}
              onChange={onChange}
            >
              <option value="yetToStart">Yet To Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">completed</option>
            </select>
          </div>
        </div>

        {/* description*/}
        <textarea
          required
          name="description"
          id=""
          placeholder="description"
          className="  border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"
          value={values.description}
          onChange={onChange}
        ></textarea>
        <div className="  flex items-center justify-between gap-4">
          <button
            className=" w-full bg-blue-800 py-2 hover:bg-blue-700 transition-all duration-300 text-white rounded"
            type="submit"
          >
            Edit Task
          </button>
          <button
            type="button"
            className=" w-full border border-red-600 text-red-600 py-2 hover:bg-red-100 transition-all duration-300 rounded"
            onClick={(e) => deleteTask(e,values._id)}
          >
            Delete
          </button>
          <button
            type="button"
            className=" w-full border border-black py-2 hover:bg-zinc-100 transition-all duration-300 rounded"
            onClick={(event) => {
                event.preventDefault();
                window.sessionStorage.removeItem("editTaskId")
                seteditTaskDiv("hidden")
            }
                 }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
