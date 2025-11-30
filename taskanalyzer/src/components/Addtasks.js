import React, { useState } from "react";
import "./Addtask.css";

function AddTasks() {
  const [task, setTask] = useState({
    title: "",
    due_date: "",
    estimated_hours: "",
    importance: "",
    dependencies: "",
  });

  const [result, setResult] = useState([]);

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const deps = task.dependencies
      ? task.dependencies.split(",").map((d) => d.trim())
      : [];

    const payload = [
      {
        title: task.title,
        due_date: task.due_date,
        estimated_hours: parseFloat(task.estimated_hours),
        importance: parseInt(task.importance),
        dependencies: deps,
      },
    ];

    const res = await fetch("http://127.0.0.1:8000/api/tasks/analyze/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="addtasks-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="due_date"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="estimated_hours"
          placeholder="Estimated Hours"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="importance"
          placeholder="Importance (1-10)"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dependencies"
          placeholder="Dependencies (comma separated)"
          onChange={handleChange}
        />
        <button type="submit">Save Task</button>
      </form>

      <h3>Saved Tasks:</h3>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default AddTasks;
