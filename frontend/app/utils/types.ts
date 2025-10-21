export interface AuthContextType {
    user: UserData | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}