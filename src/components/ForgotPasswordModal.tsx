import { useState } from 'react';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
        setSent(true);
    };

    const handleClose = () => {
        setEmail('');
        setSent(false);
        setLoading(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
                {!sent ? (
                    <>
                        <div className="text-center" style={{ marginBottom: 24 }}>
                            <div
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #0e6ba8, #00aeef)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 14px',
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <h3 className="modal-title">¿Olvidaste tu contraseña?</h3>
                            <p className="modal-subtitle" style={{ marginTop: 8 }}>
                                Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecerla.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="relative input-group" style={{ marginBottom: 20 }}>
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    className="login-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-login"
                                disabled={loading || !email.trim()}
                            >
                                {loading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                        <div className="spinner" />
                                        Enviando...
                                    </span>
                                ) : (
                                    'Enviar instrucciones'
                                )}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', marginTop: 18 }}>
                            <button className="forgot-link" onClick={handleClose}>
                                ← Volver al inicio de sesión
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center" style={{ padding: '16px 0' }}>
                        <div className="success-checkmark" style={{ fontSize: '2.5rem', marginBottom: 14 }}>
                            ✉️
                        </div>
                        <h3 className="modal-title" style={{ marginBottom: 10 }}>¡Correo enviado!</h3>
                        <p className="modal-subtitle" style={{ marginBottom: 20 }}>
                            Hemos enviado las instrucciones a <strong style={{ color: '#00aeef' }}>{email}</strong>
                        </p>
                        <p className="modal-subtitle" style={{ fontSize: '0.78rem', marginBottom: 20 }}>
                            Revisa tu bandeja de entrada y la carpeta de spam.
                        </p>
                        <button className="btn-login" onClick={handleClose}>
                            Entendido
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
