import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import Navbar from "./components/Navbar";
import DailyLog from "./pages/DailyLog";

function App() {
    return (
        <>
            <Navbar />
            <Router>
                <Routes>
                    <Route element={<GuestGuard />}>
                        <Route path="/" element={<SignIn />} />
                    </Route>

                    <Route element={<GuestGuard />}>
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route element={<AuthGuard />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>

                    <Route element={<AuthGuard />}>
                        <Route
                            path="/daily-log/:dailyLogId"
                            element={<DailyLog />}
                        />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
