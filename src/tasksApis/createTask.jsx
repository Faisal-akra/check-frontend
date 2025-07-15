import { useState } from "react";
import { NavLink } from "react-router-dom";


function CreateTaskForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
    priority: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const fetchCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem('token');
    try {
      const res = await fetch("https://localhost:9000/api/task/createTask", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.msg || "Task created successfully!");
   
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          status: "",
          priority: "",
        });
      } else {
        throw new Error(data.error || "Failed to create task");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div>
        <div className="absolute top-4 right-4 w-[300px]">
  <div className="flex flex-col items-end gap-2">
    <p className="text-right text-sm">Go To Dashboard</p>
    <NavLink 
      to="/"
      className="border bg-blue-300 rounded-2xl px-4 py-2 hover:bg-blue-300 transition text-center w-[200px]"
    >
      Dashboard
    </NavLink>
  </div>
</div>
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-8 p-8 bg-blue-50 rounded-lg border border-gray-200 shadow-md">
        <h1 className="text-2xl font-bold text-center">
              Create-Task
        </h1>

        <form onSubmit={fetchCreateTask} className="flex flex-col gap-5">
          <input
            className="border border-gray-300 text-center rounded-xl w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleData}
            required
            placeholder="Enter task title"
          />

          <input
            className="border border-gray-300 text-center rounded-xl w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleData}
            required
            placeholder="Enter task description"
          />

          <input
            className="border border-gray-300 text-center rounded-xl w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleData}
            required
            placeholder="Enter date"
          />

          <input
            className="border border-gray-300 text-center rounded-xl w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="text"
            name="status"
            value={formData.status}
            onChange={handleData}
            required
            placeholder="Enter task status"
          />

          <input
            className="border border-gray-300 text-center rounded-xl w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="text"
            name="priority"
            value={formData.priority}
            onChange={handleData}
            required
            placeholder="Enter task priority"
          />

          <button
            className="w-full bg-blue-500 text-white rounded-xl p-2 hover:bg-blue-600 transition disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 text-center p-3 rounded-md ${
              message.includes("Failed")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default CreateTaskForm;
