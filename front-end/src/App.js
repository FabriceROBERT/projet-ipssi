import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import ClientsPage from "./pages/ClientsPage";
import "./App.css";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/clients" element={<ClientsPage />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
