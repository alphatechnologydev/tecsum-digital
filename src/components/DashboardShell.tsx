import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface DashboardShellProps {
    roleName: string;
    roleColor: string;
    roleIcon: string;
}

export default function DashboardShell({ roleName, roleColor, roleIcon }: DashboardShellProps) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-bg flex flex-col items-center justify-center p-6">
            <div className="dashboard-card text-center max-w-lg w-full">
                {/* Header */}
                <div
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${roleColor}, ${roleColor}aa)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        fontSize: '2rem',
                    }}
                >
                    {roleIcon}
                </div>

                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a3a6b', marginBottom: 8 }}>
                    Panel de {roleName}
                </h1>

                <p style={{ color: '#64748b', marginBottom: 24 }}>
                    Bienvenido, <strong>{user?.username}</strong>. Este es tu espacio de trabajo.
                </p>

                <div
                    style={{
                        background: '#f8fafc',
                        borderRadius: 12,
                        padding: '16px 20px',
                        marginBottom: 24,
                        border: '1px solid #e2e8f0',
                    }}
                >
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                        🚧 Módulo en desarrollo — Próximamente habrá funcionalidades específicas para <strong>{roleName}</strong>.
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="btn btn-outline"
                    style={{
                        borderColor: roleColor,
                        color: roleColor,
                        borderRadius: 12,
                        padding: '10px 32px',
                    }}
                >
                    Cerrar sesión
                </button>
            </div>

            {/* Footer */}
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: 32 }}>
                © {new Date().getFullYear()} Tecsum Digital
            </p>
        </div>
    );
}
