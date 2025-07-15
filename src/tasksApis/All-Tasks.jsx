import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchPriority, setSearchPriority] = useState("");

  const token = localStorage.getItem("token");
  const formattedStatus = searchStatus.trim().toLowerCase();
  const formattedPriority = searchPriority.trim().toLowerCase();

  const fetchTask = async () => {
    try {
      const res = await fetch("https://check-frontend-rho.vercel.app/api/task/fetchTask", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        if (data.task && data.task.length > 0) {
          setTasks(data.task);
          setMessage(data.msg || "Tasks loaded successfully");
        } else {
          setTasks([]);

          setMessage(
            data.msg === "No tasks available" ? data.msg : "No tasks found"
          );
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Network error - could not fetch tasks");
      setTasks([]);
    }
  };

  const fetchTaskByStatus = async () => {
    try {
      const res = await fetch(
        `http://localhost:9000/api/task/fetchTaskByStatus/${formattedStatus}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(data.msg);
        setTasks(data.tasks);
      }
    } catch (error) {
      console.log(error);
      setMessage("error");
    }
  };

  const fetchTaskByPriority = async () => {
    try {
      const res = await fetch(
        `https://backend-task-management-six.vercel.app/api/task/fetchTaskByPriority/${formattedPriority}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(data.msg);
        setTasks(data.tasks);
      }
    } catch (error) {
      console.log(error);
      setMessage("error");
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center m-1 bg-blue-300 ">
        <div className="flex  justify-evenly gap-5 p-4  ">
          <p className="text-2xl">{message}</p>

          <input
            type="text"
            placeholder="Search by status..."
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchTaskByStatus();
            }}
            className="border px-2 py-1 rounded"
          />

          <input
            type="text"
            placeholder="Search by priority..."
            value={searchPriority}
            onChange={(e) => setSearchPriority(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchTaskByPriority();
            }}
            className="border px-2 py-1 rounded"
          />
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-right text-sm ">Go To Dashboard</p>
          <NavLink
            to="/"
            className="border bg-blue-400 rounded-2xl px-4 py-2 hover:bg-blue-600 transition text-center w-[180px]"
          >
            Dashboard
          </NavLink>
        </div>
      </div>

      <div className="overflow-x-auto text-center">
        <ul className="min-w-[800px]">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-blue-100 m-6 border flex items-center"
            >
              <div className="w-1/4 p-2 overflow-y-auto max-h-[100px]">
                <p className="border bg-slate-300 font-bold">Title</p>
                <p className="break-words">{task.title}</p>
              </div>

              <div className="w-2/4 p-2 overflow-y-auto max-h-[100px]">
                <p className="border bg-slate-300 font-bold">Description</p>
                <p className="break-words">{task.description}</p>
              </div>

              <div className="w-1/6 p-2">
                <p className="border bg-slate-300 font-bold">Due-Date</p>
                <p>{task.dueDate}</p>
              </div>

              <div className="w-1/6 p-2">
                <p className="border bg-slate-300 font-bold">Status</p>
                <p>{task.status}</p>
              </div>

              <div className="w-1/6 p-2">
                <p className="border bg-slate-300 font-bold">Priority</p>
                <p>{task.priority}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllTasks;
