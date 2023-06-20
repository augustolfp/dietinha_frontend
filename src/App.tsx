import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
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
    );
}

export default App;
