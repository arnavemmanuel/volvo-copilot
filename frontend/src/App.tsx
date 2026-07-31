import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import Emails from "./pages/Emails";
import Documents from "./pages/Documents";
import Scheduler from "./pages/Scheduler";
import Search from "./pages/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/emails" element={<Emails />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}