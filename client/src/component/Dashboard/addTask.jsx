import axios from "axios";
import React, { useState } from "react";

const AddTask = ({ setaddTaskDiv, fetchuserDetails }) => {
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

  async function addTask(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/addTask",
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
        setaddTaskDiv("hidden");
      }
    } catch (error) {
      alert(error.res.data.error);
    }
  }

  return (
    <div className=" bg-white rounded px-4 py-4 w-[40%]">
      <h1 className=" text-center font-semibold text-xl">Add Task</h1>
      <hr className=" mb-4 mt-2" />

      <form className=" flex flex-col gap-4" onSubmit={addTask}>
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
            Add Task
          </button>
          <button
            type="button"
            className=" w-full border border-black py-2 hover:bg-zinc-100 transition-all duration-300 rounded"
            onClick={() => setaddTaskDiv("hidden")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
