import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'Director' | 'Coordinación' | 'Control Escolar' | 'Publicidad' | 'Caja';

interface User {
    username: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated users for demo - replace with real API call
const DEMO_USERS: Record<string, { password: string; role: UserRole }> = {
    director: { password: 'director123', role: 'Director' },
    coordinacion: { password: 'coord123', role: 'Coordinación' },
    control: { password: 'control123', role: 'Control Escolar' },
    publicidad: { password: 'pub123', role: 'Publicidad' },
    caja: { password: 'caja123', role: 'Caja' },
};

const ROLE_ROUTES: Record<UserRole, string> = {
    Director: '/director',
    Coordinación: '/coordinacion',
    'Control Escolar': '/control-escolar',
    Publicidad: '/publicidad',
    Caja: '/caja',
};

export function getRoleRoute(role: UserRole): string {
    return ROLE_ROUTES[role];
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const normalizedUser = username.toLowerCase().trim();
        const demoUser = DEMO_USERS[normalizedUser];

        if (demoUser && demoUser.password === password) {
            setUser({ username: normalizedUser, role: demoUser.role });
            return { success: true };
        }

        return { success: false, error: 'Usuario o contraseña incorrectos' };
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
