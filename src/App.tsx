import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import Navbar from "./components/Navbar";
import DailyLog from "./pages/DailyLog";

function App() {
    return (
        <div className="mt-28">
            <Navbar />
            <Router>
                <Routes>
                    <Route element={<GuestGuard />}>
                        <Route path="/" element={<Login />} />
                    </Route>

                    <Route element={<GuestGuard />}>
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route element={<AuthGuard />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>

                    <Route element={<AuthGuard />}>
                        <Route path="/daily-log" element={<DailyLog />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
