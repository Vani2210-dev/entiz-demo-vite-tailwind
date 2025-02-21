import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Dashboard from "./moduleScreens/Dashboard";
import Project from "./moduleScreens/Project";
import NewProject from "./moduleScreens/NewProject";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<Project />} />
        <Route path="/newproject" element={<NewProject />} />
      </Routes>
    </Router>
  );
}

export default App;
