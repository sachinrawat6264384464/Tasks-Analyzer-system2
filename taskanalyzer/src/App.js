import React, { useState } from "react";

function App() {
  const [result, setResult] = useState([]);

  // Predefined test tasks JSON
  const testTasks = [
    {
      "title": "Fix login bug",
      "due_date": "2025-11-30",
      "estimated_hours": 2,
      "importance": 8,
      "dependencies": ["task12", "task14"]
    },
    {
      "title": "Write documentation",
      "due_date": "2025-12-10",
      "estimated_hours": 5,
      "importance": 4,
      "dependencies": []
    },
    {
      "title": "Optimize database indexes",
      "due_date": "2025-11-28",
      "estimated_hours": 3,
      "importance": 9,
      "dependencies": []
    },
    {
      "title": "Create UI mockups",
      "due_date": "2025-12-01",
      "estimated_hours": 1,
      "importance": 6,
      "dependencies": ["task3"]
    },
    {
      "title": "Refactor authentication module",
      "due_date": "2025-11-26",
      "estimated_hours": 4,
      "importance": 10,
      "dependencies": ["task1", "task2", "task9"]
    },
    {
      "title": "Email system setup",
      "due_date": "2025-12-15",
      "estimated_hours": 6,
      "importance": 5,
      "dependencies": []
    },
    {
      "title": "Fix broken CSS",
      "due_date": "2025-11-29",
      "estimated_hours": 0.5,
      "importance": 7,
      "dependencies": []
    },
    {
      "title": "API endpoint testing",
      "due_date": "2025-12-05",
      "estimated_hours": 3,
      "importance": 8,
      "dependencies": ["task1"]
    },
    {
      "title": "Set up CI/CD pipeline",
      "due_date": "2025-12-20",
      "estimated_hours": 7,
      "importance": 9,
      "dependencies": []
    },
    {
      "title": "Critical security patch",
      "due_date": "2025-11-25",
      "estimated_hours": 2,
      "importance": 10,
      "dependencies": ["task7"]
    }
  ];

  const sendTasks = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/tasks/analyze/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(testTasks)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
      console.log("Response:", data);
    } catch (err) {
      console.error("Error posting tasks:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Priority Analyzer (React → Django)</h2>
      <button onClick={sendTasks}>Send Test Tasks Automatically</button>

      <hr />

      <h3>Result:</h3>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default App;
