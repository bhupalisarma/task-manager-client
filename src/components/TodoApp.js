import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "./AuthContext";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext); // Access the userId from the AuthContext

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true); // Start loading

      const response = await axios.get(
        `http://localhost:8000/api/v1/tasks?userId=${userId}` // Use the userId from the context
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Start loading

      const response = await axios.post("http://localhost:8000/api/v1/tasks", {
        ...newTask,
        userId: userId,
      });
      setTasks([...tasks, response.data]);
      setNewTask({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-4xl font-bold mb-8 text-center">Task Manager</h2>
      <form onSubmit={createTask} className="mb-4 bg-gray-100 w-full p-2">
        <div className="mb-2 bg-gray-100 rounded-lg py-2 px-2">
          <label
            htmlFor="title"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full px-3 py-2 border rounded border-gray-400"
            required
          />
        </div>
        <div className="mb-2 bg-gray-100 rounded-lg py-2 px-2">
          <label
            htmlFor="description"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full px-3 py-2 border rounded border-gray-400"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-3 mb-2 rounded"
          disabled={loading} // Disable the button when loading
        >
          {loading ? <BeatLoader size={8} color="#FFFFFF" /> : "Create Task"}
        </button>
      </form>
      <div>
        <h3 className="text-2xl font-bold mb-4">Task List</h3>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-100 rounded-lg p-4 flex justify-between"
              >
                <div>
                  <h4 className="text-xl font-semibold">{task.title}</h4>
                  <p>{task.description}</p>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 ml-3 mb-2 rounded"
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? <BeatLoader size={6} color="#FF0000" /> : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoApp;
