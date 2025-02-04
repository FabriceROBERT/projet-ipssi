import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import ClientsPage from "./pages/ClientsPage";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import InvoicesPage from "./pages/InvoicesPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/clients" element={<ClientsPage />} />
          <Route path="/dashboard/invoices" element={<InvoicesPage />} />
          <Route path="/dashboard/files" element={<InvoicesPage />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
