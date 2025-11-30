import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({});

  const thStyle = { textAlign: "center", padding: "10px" };
  const tdStyle = { textAlign: "center", padding: "10px" };

  // Fetch tasks function (can be called after feedback submission)
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/tasks/data/");
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();

      // Fix dependencies from string → array
      const cleanData = data.map((task) => ({
        ...task,
        dependencies: task.dependencies ? task.dependencies.split(",") : [],
      }));

      const sorted = cleanData.sort((a, b) => b.priority_score - a.priority_score);

      setTasks(sorted);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getPriorityClass = (score) => {
    if (score >= 15) return "priority-high"; // very urgent
    else if (score >= 8) return "priority-medium"; // medium
    else return "priority-low"; // low
  };

  const handleFeedbackChange = (taskId, value) => {
    setFeedback({ ...feedback, [taskId]: value });
  };

  const submitFeedback = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/tasks/feedback/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback),
      });

      // Optional: clear feedback and refetch tasks
      setFeedback({});
      setLoading(true);
      fetchTasks();
      alert("Feedback submitted successfully!");
    } catch (err) {
      alert("Error submitting feedback: " + err.message);
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading tasks...</p>;
  if (error) return <p style={{ padding: "20px" }}>Error: {error}</p>;

  return (
    <div className="dashboard-container">
      <h2 style={{ marginBottom: "20px" }}>Task Priority Dashboard</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Due Date</th>
            <th>Priority Score</th>
            <th>Explanation</th>
            <th style={thStyle}>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.due_date}</td>
              <td className={getPriorityClass(task.priority_score)}>
                {task.priority_score}
              </td>
              <td>{task.explanation || "-"}</td>
              <td style={tdStyle}>
                <input
                  type="checkbox"
                  checked={feedback[task.id] || false}
                  onChange={(e) => handleFeedbackChange(task.id, e.target.checked)}
                />{" "}
                Helpful
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={submitFeedback}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Submit Feedback
      </button>
    </div>
  );
}

export default Dashboard;
