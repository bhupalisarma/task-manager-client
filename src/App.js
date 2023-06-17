import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./components/Home";
import TodoApp from "./components/TodoApp";
import { AuthProvider } from "./components/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/todo" element={<TodoApp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
