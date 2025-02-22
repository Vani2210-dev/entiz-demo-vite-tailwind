import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Project from "./screens/Project";
import NewProject from "./moduleScreens/NewProject";
import EditProject from "./moduleScreens/EditProject";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<Project />} />
        <Route path="/newproject" element={<NewProject />} />
        <Route path="/editproject/:project_id" element={<EditProject />} />
      </Routes>
    </Router>
  );
}

export default App;
