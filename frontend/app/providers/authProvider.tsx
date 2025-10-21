import { useEffect, useState } from "react";
import type { UserData, RegisterData } from "~/utils/types";
import AuthContext from "~/context/authContext";

const API_BASE_URL = "http://127.0.0.1:3000/api";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = window.token || null;
        const storedUser = window.userData || null;
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Login failed");
        }

        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        window.token = data.token;
        window.userData = data.user;
    }

    const register = async (registerData: RegisterData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Registration failed");
        }

        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        window.token = data.token;
        window.userData = data.user;
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        window.token = null;
        window.userData = null;
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            register,
            logout,
            isAuthenticated: !!token,
        }}>
        {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;