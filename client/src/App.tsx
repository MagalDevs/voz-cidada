import {ReactNode, useContext} from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/login/Login.tsx';
import {AuthContext, AuthProvider} from "@/contexts/AuthContext.tsx";
import Dashboard from "@/pages/dashboard";
import AdminDashboard from "@/pages/adminDashboard";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Cadastro from "@/pages/cadastro";

type RouteProps = {
    children: ReactNode;
    requiredRole?: string;
}

const PrivateRoute = ({ children, requiredRole }: RouteProps) => {
    const { isAuthenticated, loading, userRoles } = useContext(AuthContext);

    if (loading) {
        return "";
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (!requiredRole && userRoles?.includes("ROLE_ADMIN")) {
        return <Navigate to="/admin/dashboard" />
    }

    if (requiredRole && !userRoles?.includes(requiredRole)) {
        return <Navigate to="/dashboard" />
    }

    return children;
}

const PublicRoute = ({ children }: {children: ReactNode}) => {
    const { isAuthenticated, loading } = useContext(AuthContext);
    if (loading) {
        return "";
    }
    if (isAuthenticated) {
        return <Navigate to={"/dashboard"}/>
    }
    return children;
}

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <LoginForm />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/admin/dashboard"
                        element={
                            <PrivateRoute requiredRole="ROLE_ADMIN">
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
