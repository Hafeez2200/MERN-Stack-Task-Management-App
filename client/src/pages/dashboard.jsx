import React, { useEffect, useState } from "react";
import Header from "../component/Dashboard/header";
import AddTask from "../component/Dashboard/addTask";
import StackTitle from "../component/Dashboard/stackTitle";
import YetToStart from "../component/Dashboard/YetToStart";
import InProgress from "../component/Dashboard/InProgress";
import Completed from "../component/Dashboard/Completed";
import axios from "axios";
import EditTask from "../component/Dashboard/EditTask";

const Dashboard = () => {
  const [addTaskDiv, setaddTaskDiv] = useState("hidden");
  const [editTaskDiv, seteditTaskDiv] = useState("hidden");
  const [editTaskId, seteditTaskId] = useState(null);


  const [Tasks, setTasks] = useState();

  async function fetchuserDetails() {
    try {
      const res = await axios.get("http://localhost:1000/api/v1/userDetails", {
        withCredentials: true,
      });
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
    fetchuserDetails();
    // if(window.sessionStorage.getItem("editTaskId"))
    // {
    //     seteditTaskDiv("block");
    //     seteditTaskId(window.sessionStorage.getItem("editTaskId"))
    // }
  }, []);
  console.log(Tasks);

  return (
    <div className=" w-full relative">
      <div className=" bg-white">
        <Header setaddTaskDiv={setaddTaskDiv} />
      </div>

      <div className=" px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh] max-h-auto ">
        <div className=" w-1/3">
          <StackTitle title={"Yet To Start"} />
          <div className=" pt-4">
            {Tasks && <YetToStart task={Tasks.yetToStart} seteditTaskId = {seteditTaskId} seteditTaskDiv = {seteditTaskDiv} />}
          </div>
        </div>

        <div className=" w-1/3">
          <StackTitle title={"In Progress"} />
          <div className=" pt-4">
            {Tasks && <InProgress task={Tasks.inProgress} seteditTaskId = {seteditTaskId} seteditTaskDiv = {seteditTaskDiv} />}
          </div>
        </div>
        <div className=" w-1/3">
          <StackTitle title={"Completed"} />
          <div className=" pt-4">
            {Tasks && <Completed task={Tasks.completed} seteditTaskId = {seteditTaskId} seteditTaskDiv = {seteditTaskDiv} />}
          </div>
        </div>
      </div>

      <div
        className={` w-full ${addTaskDiv} block h-screen fixed top-0 bg-zinc-800 opacity-85`}
      >
        <div
          className={` w-full  ${addTaskDiv} h-screen fixed top-0 flex items-center justify-center`}
        >
          <AddTask
            setaddTaskDiv={setaddTaskDiv}
            fetchuserDetails={fetchuserDetails}
          />
        </div>
      </div>
      {editTaskDiv === "block" && editTaskId && (
        <>
        <div
        className={` w-full ${editTaskDiv} block h-screen fixed top-0 bg-zinc-800 opacity-85`}
      ></div>
        <div
          className={` w-full  ${editTaskDiv} h-screen fixed top-0 flex items-center justify-center`}
        >
          <EditTask
            seteditTaskDiv={seteditTaskDiv}
            fetchuserDetails={fetchuserDetails}
            editTaskId = {editTaskId}
          />
        </div>

        </>
      ) }

       
      </div>

    
  );
};

export default Dashboard;
