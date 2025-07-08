import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavSideBar from "./NavSidebar/NavSideBar";
import OverviewPage from "./pages/OverviewPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DoctorsPage from "./pages/DoctorsPage";
import HistoryPage from "./pages/HistoryPage";
import MapPage from "./pages/MapPage";
import PatientsPage from "./pages/PatientsPage";
import SettingsPage from "./pages/SettingsPage";

export default function HomeworkLayout() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <NavSideBar />
        <main className="flex-1 bg-gray-50 p-8">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
