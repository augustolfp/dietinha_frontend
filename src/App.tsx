import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import Navbar from "./components/Navbar";
import DailyLogPage from "./pages/DailyLogPage";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route element={<GuestGuard />}>
                        <Route path="/" element={<SignInPage />} />
                    </Route>

                    <Route element={<GuestGuard />}>
                        <Route path="/sign-up" element={<SignUpPage />} />
                    </Route>

                    <Route element={<AuthGuard />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Route>

                    <Route element={<AuthGuard />}>
                        <Route
                            path="/daily-log/:dailyLogId"
                            element={<DailyLogPage />}
                        />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
