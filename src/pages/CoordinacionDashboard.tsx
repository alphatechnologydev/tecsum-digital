import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { CARRERAS, DOCENTES, ALUMNOS, type Docente } from '../data/mockData';

/* ── Menu Items ──────────────────────────────────────── */
const COORD_MENU = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { id: 'profesores', label: 'Profesores', icon: 'book' },
    { id: 'alumnos', label: 'Alumnos', icon: 'graduation' },
    { id: 'planeaciones', label: 'Planeaciones', icon: 'clipboard' },
    { id: 'incidencias', label: 'Incidencias', icon: 'alert' },
    { id: 'evaluaciones', label: 'Evaluaciones', icon: 'check' },
];

/* ── Mock Data: Clases en Curso ─────────────────────── */
const CLASES_EN_CURSO = [
    { materia: 'Contabilidad I', docente: 'Lic. María Fernández', grupo: '1A', aula: 'A-101', hora: '11:00 - 12:00', status: 'active', color: '#0e6ba8' },
    { materia: 'Programación Web', docente: 'Ing. Roberto Castillo', grupo: '3A', aula: 'C-205', hora: '11:00 - 12:00', status: 'active', color: '#2e7d32' },
    { materia: 'Diseño Gráfico', docente: 'Lic. Andrea Solís', grupo: '1A', aula: 'B-102', hora: '11:00 - 12:00', status: 'active', color: '#c62828' },
    { materia: 'Cosmetología I', docente: 'Mtra. Lucía Herrera', grupo: '1A', aula: 'D-301', hora: '11:00 - 12:00', status: 'active', color: '#6a1b9a' },
    { materia: 'Python', docente: 'Ing. Sofía Navarro', grupo: '1B', aula: 'C-103', hora: '11:00 - 12:00', status: 'active', color: '#2e7d32' },
];

/* ── Mock Data: Planeaciones ────────────────────────── */
const PLANEACIONES = [
    { id: 1, docente: 'Lic. María Fernández', materia: 'Contabilidad I', grupo: '1A', avance: 68, ultimaActualizacion: '15 Feb 2026', status: 'Al día' },
    { id: 2, docente: 'Lic. María Fernández', materia: 'Costos', grupo: '2A', avance: 72, ultimaActualizacion: '14 Feb 2026', status: 'Al día' },
    { id: 3, docente: 'Lic. María Fernández', materia: 'Auditoría', grupo: '3A', avance: 65, ultimaActualizacion: '16 Feb 2026', status: 'Al día' },
    { id: 4, docente: 'C.P. Jorge Ramírez', materia: 'Finanzas I', grupo: '1B', avance: 55, ultimaActualizacion: '10 Feb 2026', status: 'Retrasado' },
    { id: 5, docente: 'C.P. Jorge Ramírez', materia: 'Fiscal II', grupo: '2B', avance: 70, ultimaActualizacion: '17 Feb 2026', status: 'Al día' },
    { id: 6, docente: 'Lic. Andrea Solís', materia: 'Diseño Digital', grupo: '1A', avance: 80, ultimaActualizacion: '18 Feb 2026', status: 'Adelantado' },
    { id: 7, docente: 'Lic. Andrea Solís', materia: 'Branding', grupo: '2A', avance: 75, ultimaActualizacion: '18 Feb 2026', status: 'Al día' },
    { id: 8, docente: 'Ing. Roberto Castillo', materia: 'HTML/CSS', grupo: '1A', avance: 90, ultimaActualizacion: '19 Feb 2026', status: 'Adelantado' },
    { id: 9, docente: 'Ing. Roberto Castillo', materia: 'JavaScript', grupo: '2A', avance: 85, ultimaActualizacion: '19 Feb 2026', status: 'Adelantado' },
    { id: 10, docente: 'Ing. Roberto Castillo', materia: 'React', grupo: '3A', avance: 60, ultimaActualizacion: '18 Feb 2026', status: 'Al día' },
];

/* ── Mock Data: Incidencias ─────────────────────────── */
const INCIDENCIAS_INIT = [
    { id: 1, tipo: 'Alumno', persona: 'Ana García Pérez', descripcion: 'Llegó 20 minutos tarde sin justificante', fecha: '18 Feb 2026', reportadoPor: 'Coordinación', estado: 'Abierta' },
    { id: 2, tipo: 'Profesor', persona: 'Lic. Carlos Ramírez', descripcion: 'Ausencia por enfermedad - clase cubierta', fecha: '17 Feb 2026', reportadoPor: 'Control Escolar', estado: 'Resuelta' },
    { id: 3, tipo: 'Alumno', persona: 'Eduardo Martínez', descripcion: 'Conducta inapropiada en clase', fecha: '16 Feb 2026', reportadoPor: 'Docente', estado: 'En proceso' },
    { id: 4, tipo: 'Alumno', persona: 'Patricia Gil', descripcion: 'Falta a 3 clases consecutivas', fecha: '15 Feb 2026', reportadoPor: 'Coordinación', estado: 'En proceso' },
    { id: 5, tipo: 'Profesor', persona: 'Mtra. Lucía Herrera', descripcion: 'Retraso de 15 minutos', fecha: '14 Feb 2026', reportadoPor: 'Coordinación', estado: 'Abierta' },
];

/* ── Mock Data: Encuestas ───────────────────────────── */
const ENCUESTAS = [
    { id: 1, titulo: 'Evaluación Docente Feb 2026', tipo: 'Docente', fechaCreacion: '10 Feb 2026', fechaCierre: '28 Feb 2026', estado: 'Activa', respuestas: 45, totalDestinos: 120 },
    { id: 2, titulo: 'Satisfacción con Instalaciones', tipo: 'Instalaciones', fechaCreacion: '05 Feb 2026', fechaCierre: '20 Feb 2026', estado: 'Cerrada', respuestas: 98, totalDestinos: 100 },
    { id: 3, titulo: 'Evaluación de Cursos Q1', tipo: 'Curso', fechaCreacion: '01 Feb 2026', fechaCierre: '25 Feb 2026', estado: 'Activa', respuestas: 67, totalDestinos: 150 },
    { id: 4, titulo: 'Clima Escolar 2026', tipo: 'Instalaciones', fechaCreacion: '12 Feb 2026', fechaCierre: '15 Mar 2026', estado: 'Borrador', respuestas: 0, totalDestinos: 200 },
];

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function CoordinacionDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // State
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [selectedDocente, setSelectedDocente] = useState<Docente | null>(null);
    const [selectedAlumno, setSelectedAlumno] = useState<any | null>(null);
    const [selectedCarrera, setSelectedCarrera] = useState('contabilidad');
    const [incidencias, setIncidencias] = useState(INCIDENCIAS_INIT);
    const [incidentForm, setIncidentForm] = useState({ tipo: 'Alumno', persona: '', descripcion: '', fecha: new Date().toISOString().split('T')[0] });
    const [, setShowNewEncuesta] = useState(false);

    const handleLogout = () => { logout(); navigate('/login'); };

    const getPageTitle = () => {
        const item = COORD_MENU.find(m => m.id === activeMenu);
        return item ? item.label : 'Dashboard';
    };

    const handleSubmitIncident = () => {
        if (!incidentForm.persona.trim() || !incidentForm.descripcion.trim()) return;
        const newIncident = {
            id: incidencias.length + 1,
            tipo: incidentForm.tipo,
            persona: incidentForm.persona,
            descripcion: incidentForm.descripcion,
            fecha: new Date(incidentForm.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }),
            reportadoPor: user?.username || 'Coordinación',
            estado: 'Abierta' as const
        };
        setIncidencias([newIncident, ...incidencias]);
        setIncidentForm({ tipo: 'Alumno', persona: '', descripcion: '', fecha: new Date().toISOString().split('T')[0] });
    };

    /* ── Render: Dashboard view ─────────────────────────── */
    const renderDashboard = () => {
        const stats = [
            { label: 'Total Profesores', value: DOCENTES.length, icon: 'book', color: '#0097a7' },
            { label: 'Total Alumnos', value: ALUMNOS.length, icon: 'graduation', color: '#0097a7' },
            { label: 'Incidencias Abiertas', value: incidencias.filter(i => i.estado === 'Abierta').length, icon: 'alert', color: '#ef4444' },
            { label: 'Planeaciones al Día', value: PLANEACIONES.filter(p => p.status === 'Al día').length, icon: 'check', color: '#10b981' },
        ];

        return (
            <>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                        Bienvenido, {user?.username} 👋
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Panel de Coordinación Académica</p>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                    {stats.map(s => (
                        <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: 8, fontWeight: 500 }}>{s.label}</p>
                                    <p style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{s.value}</p>
                                </div>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                                    <Icon name={s.icon} size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Clases en Curso */}
                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', background: 'linear-gradient(135deg, #0097a7, #00acc1)' }}>
                        <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>📚 Clases en Curso</h3>
                    </div>
                    <div style={{ padding: 24 }}>
                        {CLASES_EN_CURSO.filter(c => c.status === 'active').map((clase, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: '#f8fafc', marginBottom: 12, border: '1px solid #f1f5f9' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{clase.materia}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>{clase.docente}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: 12, background: '#e0f2fe', color: '#0284c7' }}>{clase.grupo}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{clase.aula}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981' }}>Activo</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    };

    /* ── Render: Profesores view ────────────────────────── */
    const renderProfesoresView = () => {
        // Reuse similar logic from DirectorDashboard - simplified for coordinator
        const filteredDocentes = DOCENTES.filter(d => d.carrera === selectedCarrera);

        if (selectedDocente) {
            return (
                <div>
                    <button onClick={() => setSelectedDocente(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, transition: 'all 0.15s' }}>
                        ← Volver a lista
                    </button>
                    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 32, textAlign: 'center' }}>
                        <h2 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: 700 }}>{selectedDocente.nombre}</h2>
                        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{selectedDocente.especialidad}</p>
                        <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: 16 }}>Vista detallada en desarrollo. Por ahora puede ver la información básica del docente.</p>
                    </div>
                </div>
            );
        }

        return (
            <>
                {/* Career tabs */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                    {CARRERAS.map(c => (
                        <button key={c.id} onClick={() => setSelectedCarrera(c.id)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: 12,
                                border: 'none',
                                background: selectedCarrera === c.id ? c.gradient : '#fff',
                                color: selectedCarrera === c.id ? '#fff' : '#64748b',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                boxShadow: selectedCarrera === c.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        >{c.label}</button>
                    ))}
                </div>

                {/* Docentes list */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {filteredDocentes.map(doc => (
                        <div key={doc.id} onClick={() => setSelectedDocente(doc)}
                            style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 20, cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{doc.nombre}</h3>
                            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 12 }}>{doc.especialidad}</p>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                                <div>📧 {doc.email}</div>
                                <div>📞 {doc.tel}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    /* ── Render: Alumnos view ───────────────────────────── */
    const renderAlumnosView = () => {
        const filteredAlumnos = ALUMNOS.filter(a => a.carrera === selectedCarrera);

        if (selectedAlumno) {
            return (
                <div>
                    <button onClick={() => setSelectedAlumno(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, transition: 'all 0.15s' }}>
                        ← Volver a lista
                    </button>
                    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 32, textAlign: 'center' }}>
                        <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#f1f5f9', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>👤</div>
                        <h2 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: 700 }}>{selectedAlumno.nombre}</h2>
                        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Matrícula: {selectedAlumno.matricula}</p>
                        <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: 16 }}>Vista detallada en desarrollo. Por ahora puede ver la información básica del alumno.</p>
                    </div>
                </div>
            );
        }

        return (
            <>
                {/* Career tabs */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                    {CARRERAS.map(c => (
                        <button key={c.id} onClick={() => setSelectedCarrera(c.id)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: 12,
                                border: 'none',
                                background: selectedCarrera === c.id ? c.gradient : '#fff',
                                color: selectedCarrera === c.id ? '#fff' : '#64748b',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                boxShadow: selectedCarrera === c.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        >{c.label}</button>
                    ))}
                </div>

                {/* Alumnos table */}
                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>NOMBRE</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>MATRÍCULA</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>SEMESTRE</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>GRUPO</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>ESTADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAlumnos.map(alumno => (
                                <tr key={alumno.id} onClick={() => setSelectedAlumno(alumno)}
                                    style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '14px 20px', fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{alumno.nombre}</td>
                                    <td style={{ padding: '14px 20px', fontSize: '0.85rem', color: '#64748b' }}>{alumno.matricula}</td>
                                    <td style={{ padding: '14px 20px', fontSize: '0.85rem', color: '#64748b' }}>{alumno.semestre}º</td>
                                    <td style={{ padding: '14px 20px', fontSize: '0.85rem', color: '#64748b' }}>{alumno.grupo}</td>
                                    <td style={{ padding: '14px 20px' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: 12, background: alumno.status === 'Regular' ? '#f0fdf4' : '#fef2f2', color: alumno.status === 'Regular' ? '#16a34a' : '#dc2626' }}>{alumno.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    };

    /* ── Render: Planeaciones view ──────────────────────── */
    const renderPlaneacionesView = () => {
        const filteredPlans = PLANEACIONES.filter(p => {
            const doc = DOCENTES.find(d => d.nombre === p.docente);
            return doc?.carrera === selectedCarrera;
        });

        return (
            <>
                {/* Career filter tabs */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                    {CARRERAS.map(c => (
                        <button key={c.id} onClick={() => setSelectedCarrera(c.id)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: 12,
                                border: 'none',
                                background: selectedCarrera === c.id ? c.gradient : '#fff',
                                color: selectedCarrera === c.id ? '#fff' : '#64748b',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                boxShadow: selectedCarrera === c.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        >{c.label}</button>
                    ))}
                </div>

                {/* Table */}
                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>DOCENTE</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>MATERIA</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>GRUPO</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>AVANCE</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>ACTUALIZACIÓN</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>ESTADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlans.map(plan => (
                                <tr key={plan.id} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '14px 20px', fontSize: '0.85rem', color: '#64748b' }}>{plan.docente}</td>
                                    <td style={{ padding: '14px 20px', fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{plan.materia}</td>
                                    <td style={{ padding: '14px 20px', fontSize: '0.85rem' }}>
                                        <span style={{ padding: '4px 10px', borderRadius: 12, background: '#e0f2fe', color: '#0284c7', fontWeight: 600, fontSize: '0.75rem' }}>{plan.grupo}</span>
                                    </td>
                                    <td style={{ padding: '14px 20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                                                <div style={{ width: `${plan.avance}%`, height: '100%', background: '#0097a7', borderRadius: 3 }}></div>
                                            </div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>{plan.avance}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 20px', fontSize: '0.75rem', color: '#64748b' }}>{plan.ultimaActualizacion}</td>
                                    <td style={{ padding: '14px 20px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: 12,
                                            background: plan.status === 'Al día' ? '#f0fdf4' : plan.status === 'Adelantado' ? '#eff6ff' : '#fffbeb',
                                            color: plan.status === 'Al día' ? '#16a34a' : plan.status === 'Adelantado' ? '#2563eb' : '#d97706',
                                            fontWeight: 600,
                                            fontSize: '0.75rem'
                                        }}>{plan.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    };

    /* ── Render: Incidencias view ───────────────────────── */
    const renderIncidenciasView = () => {
        const personList = incidentForm.tipo === 'Alumno' ? ALUMNOS : DOCENTES;

        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
                {/* Form */}
                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 32, height: 'fit-content' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Registrar Incidencia</h3>

                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 6 }}>TIPO</label>
                        <select value={incidentForm.tipo} onChange={e => setIncidentForm({ ...incidentForm, tipo: e.target.value, persona: '' })}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.85rem', fontFamily: 'inherit' }}>
                            <option value="Alumno">Alumno</option>
                            <option value="Profesor">Profesor</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 6 }}>PERSONA</label>
                        <select value={incidentForm.persona} onChange={e => setIncidentForm({ ...incidentForm, persona: e.target.value })}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.85rem', fontFamily: 'inherit' }}>
                            <option value="">Seleccionar...</option>
                            {personList.map((p: any) => (
                                <option key={p.id} value={p.nombre}>{p.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 6 }}>DESCRIPCIÓN</label>
                        <textarea value={incidentForm.descripcion} onChange={e => setIncidentForm({ ...incidentForm, descripcion: e.target.value })}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.85rem', fontFamily: 'inherit', minHeight: 100, resize: 'vertical' }}
                            placeholder="Describe el incidente..."></textarea>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 6 }}>FECHA</label>
                        <input type="date" value={incidentForm.fecha} onChange={e => setIncidentForm({ ...incidentForm, fecha: e.target.value })}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.85rem', fontFamily: 'inherit' }} />
                    </div>

                    <button onClick={handleSubmitIncident}
                        style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: '#0097a7', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#008c9e'}
                        onMouseLeave={e => e.currentTarget.style.background = '#0097a7'}>
                        Registrar Incidencia
                    </button>
                </div>

                {/* List */}
                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Incidencias Recientes</h3>
                    </div>
                    <div style={{ padding: 24, maxHeight: 600, overflowY: 'auto' }}>
                        {incidencias.map(inc => (
                            <div key={inc.id} style={{ padding: '16px', borderRadius: 10, background: '#f8fafc', marginBottom: 12, border: '1px solid #f1f5f9' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: 12,
                                            background: inc.tipo === 'Alumno' ? '#eff6ff' : '#faf5ff',
                                            color: inc.tipo === 'Alumno' ? '#2563eb' : '#7c3aed',
                                            fontWeight: 600,
                                            fontSize: '0.7rem'
                                        }}>{inc.tipo}</span>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: 12,
                                            background: inc.estado === 'Resuelta' ? '#f0fdf4' : inc.estado === 'En proceso' ? '#fffbeb' : '#fef2f2',
                                            color: inc.estado === 'Resuelta' ? '#16a34a' : inc.estado === 'En proceso' ? '#d97706' : '#dc2626',
                                            fontWeight: 600,
                                            fontSize: '0.7rem'
                                        }}>{inc.estado}</span>
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{inc.fecha}</span>
                                </div>
                                <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{inc.persona}</div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{inc.descripcion}</div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 6 }}>Reportado por: {inc.reportadoPor}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    /* ── Render: Evaluaciones view ──────────────────────── */
    const renderEvaluacionesView = () => {
        return (
            <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Encuestas y Evaluaciones</h2>
                    <button onClick={() => setShowNewEncuesta(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 10, border: 'none', background: '#0097a7', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#008c9e'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#0097a7'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                        <Icon name="plus" size={18} /> Crear Encuesta
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                    {ENCUESTAS.map(enc => (
                        <div key={enc.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                <span style={{
                                    padding: '4px 12px',
                                    borderRadius: 12,
                                    background: enc.tipo === 'Docente' ? '#eff6ff' : enc.tipo === 'Curso' ? '#fef3c7' : '#f0fdf4',
                                    color: enc.tipo === 'Docente' ? '#2563eb' : enc.tipo === 'Curso' ? '#d97706' : '#16a34a',
                                    fontWeight: 600,
                                    fontSize: '0.7rem'
                                }}>{enc.tipo}</span>
                                <span style={{
                                    padding: '4px 12px',
                                    borderRadius: 12,
                                    background: enc.estado === 'Activa' ? '#f0fdf4' : enc.estado === 'Cerrada' ? '#f8fafc' : '#fffbeb',
                                    color: enc.estado === 'Activa' ? '#16a34a' : enc.estado === 'Cerrada' ? '#64748b' : '#d97706',
                                    fontWeight: 600,
                                    fontSize: '0.7rem'
                                }}>{enc.estado}</span>
                            </div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{enc.titulo}</h3>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 12 }}>
                                <div>Creada: {enc.fechaCreacion}</div>
                                <div>Cierre: {enc.fechaCierre}</div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Respuestas</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>{enc.respuestas}/{enc.totalDestinos}</span>
                                </div>
                                <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                                    <div style={{ width: `${(enc.respuestas / enc.totalDestinos) * 100}%`, height: '100%', background: '#0097a7', borderRadius: 3 }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}>Ver</button>
                                <button style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', background: '#0097a7', color: '#fff', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#008c9e'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#0097a7'}>Resultados</button>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    /* ── Main Render ────────────────────────────────────── */
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
            {/* Sidebar */}
            <aside style={{ width: 240, background: '#fff', borderRight: '1px solid #e2e8f0', position: 'fixed', height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '24px 20px', borderBottom: '1px solid #e2e8f0' }}>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, background: 'linear-gradient(135deg, #0097a7, #00acc1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>TECSUM</h1>
                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '4px 0 0' }}>Coordinación</p>
                </div>
                <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
                    {COORD_MENU.map(item => (
                        <button key={item.id} onClick={() => setActiveMenu(item.id)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                marginBottom: 4,
                                border: 'none',
                                borderRadius: 10,
                                background: activeMenu === item.id ? '#0097a715' : 'transparent',
                                color: activeMenu === item.id ? '#0097a7' : '#64748b',
                                fontWeight: activeMenu === item.id ? 700 : 500,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                transition: 'all 0.15s',
                                textAlign: 'left'
                            }}
                            onMouseEnter={e => { if (activeMenu !== item.id) e.currentTarget.style.background = '#f8fafc'; }}
                            onMouseLeave={e => { if (activeMenu !== item.id) e.currentTarget.style.background = 'transparent'; }}>
                            <Icon name={item.icon} size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div style={{ padding: '12px 8px', borderTop: '1px solid #e2e8f0' }}>
                    <button onClick={handleLogout}
                        style={{ width: '100%', padding: '12px 16px', border: 'none', borderRadius: 10, background: 'transparent', color: '#ef4444', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10, transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Icon name="logout" size={18} />
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <header style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '16px 28px', position: 'sticky', top: 0, zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>{getPageTitle()}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ position: 'relative' }}>
                                <Icon name="bell" size={20} />
                                <div style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid #fff' }}></div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0097a715', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0097a7', fontWeight: 700, fontSize: '0.85rem' }}>
                                    {user?.username?.charAt(0).toUpperCase()}
                                </div>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{user?.username}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div style={{ padding: '24px 28px', flex: 1 }}>
                    {activeMenu === 'dashboard' && renderDashboard()}
                    {activeMenu === 'profesores' && renderProfesoresView()}
                    {activeMenu === 'alumnos' && renderAlumnosView()}
                    {activeMenu === 'planeaciones' && renderPlaneacionesView()}
                    {activeMenu === 'incidencias' && renderIncidenciasView()}
                    {activeMenu === 'evaluaciones' && renderEvaluacionesView()}
                </div>
            </main>
        </div>
    );
}
