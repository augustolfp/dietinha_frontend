import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/register";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="mt-28">
            <Navbar />
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <GuestGuard>
                                <Login />
                            </GuestGuard>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <GuestGuard>
                                <Register />
                            </GuestGuard>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <AuthGuard>
                                <Dashboard />
                            </AuthGuard>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
