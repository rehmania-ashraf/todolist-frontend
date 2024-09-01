import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: "", description: "" });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/getAllTodos/:id"
        );
        console.log(response.data, "asdhgkjl");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/createTodo",
        newTodo
      );
      setTodos([...todos, response.data]);
      setNewTodo({ name: "", description: "" });
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleUpdateTodo = async (id, name, description) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/user/updateTodo/${id}`, {
        name,
        description,
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, name, description } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/user/deleteTodo/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleComplted = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/user/updateTodo/${id}`, {
        status: status,
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, status: "completed" } : todo
        )
      );
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:'black',
        color:'white'
      }}
    >
      <div>
        <h1>My Todo List</h1>
        <div style={{background:'grey', padding: '30px'}}>
          <div style={{display: 'flex'}}>
          <div style={{textAlign: 'start'}}>
          <h3>Title</h3>
          <input
            style={{ marginRight: "10px" }}
            type="text"
            value={newTodo.name}
            onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
            placeholder="Add new todo name"
          />
          </div>
          <div style={{textAlign: 'start'}}>
          <h3>Description</h3>
          <input
            style={{ marginRight: "10px" }}
            type="text"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            placeholder="Add new todo description"
          />
          </div>
          <div style={{position: 'relative', top :'62px'}}>
          <button onClick={handleCreateTodo}>Create Todo</button>
          </div>
          </div>
          <ul style={{ listStyleType: "none", padding: "0px" }}>
            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  justifyContent: "start",
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                <span style={{ marginRight: "10px" }}>
                  {todo.name} - {todo.description}
                </span>
                {todo.status === "completed" ? (
                  <button className="completed">Completed</button>
                ) : (
                  <>
                    <button
                      style={{ marginRight: "10px" }}
                      onClick={() =>
                        handleUpdateTodo(
                          todo.id,
                          prompt("Enter new name for todo"),
                          prompt("Enter new description for todo")
                        )
                      }
                    >
                      Update
                    </button>
                    <button
                      style={{ marginRight: "10px" }}
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleComplted(todo.id, "completed")}
                    >
                      Completed
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
