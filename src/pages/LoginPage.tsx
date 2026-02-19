import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, getRoleRoute } from '../context/AuthContext';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setError('Por favor, completa todos los campos');
            return;
        }

        setError('');
        setLoading(true);

        const result = await login(username, password);

        if (result.success) {
            const normalizedUser = username.toLowerCase().trim();
            const roleMap: Record<string, string> = {
                director: 'Director',
                coordinacion: 'Coordinación',
                control: 'Control Escolar',
                publicidad: 'Publicidad',
                caja: 'Caja',
            };
            const role = roleMap[normalizedUser];
            if (role) {
                navigate(getRoleRoute(role as any));
            }
        } else {
            setError(result.error || 'Error al iniciar sesión');
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            {/* ═══════ LEFT PANEL — Logo + illustration ═══════ */}
            <div className="login-left">
                {/* Organic blob SVG background */}
                <div className="blob-shape">
                    <svg viewBox="0 0 800 800" preserveAspectRatio="none">
                        <path
                            d="M 400 0 Q 800 0, 800 400 Q 800 800, 400 800 Q 200 800, 100 650 Q 0 500, 50 350 Q 100 200, 200 100 Q 300 0, 400 0 Z"
                            fill="#ffffff"
                        />
                    </svg>
                </div>

                {/* Decorative circles */}
                <div className="deco-circle deco-circle-1" />
                <div className="deco-circle deco-circle-2" />
                <div className="deco-circle deco-circle-3" />
                <div className="deco-circle deco-circle-4" />

                {/* Logos side by side */}
                <div className="logo-area">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
                        <img src="/img/Tecsum_Logo.webp" alt="TECSUM Logo" />
                        <img src="/img/Cecovam-Logo.webp" alt="Cecovam Logo" />
                    </div>
                    <p style={{ gap: '32px' }}>Bachilleratos Tecnológicos y Diplomados</p>
                </div>

                {/* Footer */}
                <div className="left-footer">
                    <p>© {new Date().getFullYear()} TECSUM · Cecovam</p>
                </div>
            </div>

            {/* ═══════ RIGHT PANEL — Login form ═══════ */}
            <div className="login-right">
                {/* Decorative floating dots */}
                <div className="float-dot float-dot-1" />
                <div className="float-dot float-dot-2" />
                <div className="float-dot float-dot-3" />

                <div className="login-form-container">
                    <h1 style={{ textAlign: 'center' }}>Iniciar Sesión</h1>

                    {/* Error */}
                    {error && (
                        <div className="error-alert">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Username */}
                        <div style={{ marginBottom: 18 }}>
                            <label className="field-label">Usuario</label>
                            <div className="relative input-group">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </span>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Ingresa tu usuario"
                                    className="login-input"
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value); setError(''); }}
                                    autoComplete="username"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: 10 }}>
                            <label className="field-label">Contraseña</label>
                            <div className="relative input-group">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Ingresa tu contraseña"
                                    className="login-input"
                                    style={{ paddingRight: '2.75rem' }}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div style={{ textAlign: 'right', marginBottom: 28 }}>
                            <button type="button" className="forgot-link" onClick={() => setShowForgotModal(true)}>
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    <div className="spinner" />
                                    Iniciando sesión...
                                </span>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>
                </div>

                {/* Right footer */}
                <div className="right-footer">
                    Tecsum Digital · Plataforma de gestión escolar
                </div>
            </div>

            {/* Forgot Password Modal */}
            <ForgotPasswordModal isOpen={showForgotModal} onClose={() => setShowForgotModal(false)} />
        </div>
    );
}
