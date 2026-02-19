import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { CARRERAS, TIME_SLOTS, DAYS, DAY_LABELS, DOCENTES, ALUMNOS, type Docente } from '../data/mockData';

/* ── Sidebar menu items ─────────────────────────────── */
const MENU_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { id: 'administrativos', label: 'Administrativos', icon: 'users' },
    { id: 'docentes', label: 'Docentes', icon: 'book' },
    { id: 'alumnos', label: 'Alumnos', icon: 'graduation' },
    { id: 'reportes', label: 'Reportes', icon: 'chart' },
    { id: 'configuracion', label: 'Configuración', icon: 'settings' },
];

/* ── Stat cards ─────────────────────────────────────── */
const STATS = [
    { label: 'Total Alumnos', value: '620', change: '+12', up: true, icon: 'graduation' },
    { label: 'Docentes Activos', value: '48', change: '+3', up: true, icon: 'book' },
    { label: 'Administrativos', value: '24', change: '0', up: true, icon: 'users' },
    { label: 'Tasa de Eficiencia', value: '92%', change: '+2.5%', up: true, icon: 'chart' },
];

/* ── Recent activity ────────────────────────────────── */
const RECENT = [
    { name: 'Inscripción nuevo alumno', area: 'Alumnos', person: 'María López', date: '18 Feb 2026', status: 'Completado' },
    { name: 'Solicitud de permiso', area: 'Administrativos', person: 'Carlos Ruiz', date: '18 Feb 2026', status: 'Pendiente' },
    { name: 'Alta de docente', area: 'Docentes', person: 'Ana García', date: '17 Feb 2026', status: 'Completado' },
    { name: 'Baja temporal alumno', area: 'Alumnos', person: 'Jorge Martínez', date: '17 Feb 2026', status: 'En proceso' },
    { name: 'Actualización de nómina', area: 'Administrativos', person: 'Laura Sánchez', date: '16 Feb 2026', status: 'Completado' },
];

/* ── Chart data ─────────────────────────────────────── */
const CHART_DATA = [
    { month: 'Sep', val: 580 },
    { month: 'Oct', val: 590 },
    { month: 'Nov', val: 600 },
    { month: 'Dic', val: 595 },
    { month: 'Ene', val: 610 },
    { month: 'Feb', val: 620 },
];

/* ── Classes in progress (dashboard) ───────────────── */
const CLASES_EN_CURSO = [
    { materia: 'Contabilidad I', docente: 'Lic. María Fernández', grupo: '1A', aula: 'A-101', hora: '11:00 - 12:00', carrera: 'Contabilidad', color: '#0e6ba8' },
    { materia: 'Programación Web', docente: 'Ing. Roberto Castillo', grupo: '2A', aula: 'L-201', hora: '11:00 - 12:00', carrera: 'Programación', color: '#2e7d32' },
    { materia: 'Redes I', docente: 'Ing. Alejandra Morales', grupo: '1B', aula: 'L-203', hora: '11:00 - 12:00', carrera: 'Redes', color: '#6a1b9a' },
    { materia: 'Diseño Gráfico', docente: 'Lic. Carmen Juárez', grupo: '2B', aula: 'D-102', hora: '11:00 - 12:00', carrera: 'Diseño', color: '#c62828' },
    { materia: 'Costos', docente: 'Lic. María Fernández', grupo: '2A', aula: 'A-103', hora: '11:00 - 12:00', carrera: 'Contabilidad', color: '#0e6ba8' },
    { materia: 'Base de Datos', docente: 'Ing. Patricia Vega', grupo: '3A', aula: 'L-202', hora: '11:00 - 12:00', carrera: 'Programación', color: '#2e7d32' },
];

/* ── Assigned tasks (dashboard) ────────────────────── */
const TAREAS_ASIGNADAS = [
    { id: 1, titulo: 'Revisión de planes semestrales', area: 'Coordinación', responsable: 'Lic. Roberto Hernández', fecha: '20 Feb 2026', prioridad: 'Alta' as const, estado: 'En proceso' as const, descripcion: 'Revisar y actualizar los planes de estudio para el semestre Ago-Ene 2026-2027. Incluir las nuevas unidades de aprendizaje aprobadas por la junta directiva.' },
    { id: 2, titulo: 'Entrega de certificados pendientes', area: 'Control Escolar', responsable: 'Lic. Patricia Gómez', fecha: '22 Feb 2026', prioridad: 'Alta' as const, estado: 'Pendiente' as const, descripcion: 'Hay 15 certificados de la generación 2023-2025 que requieren firma del director y sello institucional.' },
    { id: 3, titulo: 'Campaña de inscripciones Mar 2026', area: 'Publicidad', responsable: 'Lic. Diana Torres', fecha: '25 Feb 2026', prioridad: 'Media' as const, estado: 'En proceso' as const, descripcion: 'Diseñar y ejecutar la campaña publicitaria para el nuevo periodo de inscripciones. Incluir redes sociales, volantes y spot de radio.' },
    { id: 4, titulo: 'Corte de caja mensual', area: 'Caja', responsable: 'C.P. Fernando Vega', fecha: '28 Feb 2026', prioridad: 'Media' as const, estado: 'Pendiente' as const, descripcion: 'Realizar el corte de caja del mes de febrero y generar el reporte financiero para la dirección.' },
    { id: 5, titulo: 'Mantenimiento aulas bloque B', area: 'Limpieza', responsable: 'Sr. Miguel Ángel Pérez', fecha: '19 Feb 2026', prioridad: 'Baja' as const, estado: 'Completado' as const, descripcion: 'Realizar limpieza profunda y mantenimiento preventivo de las aulas del bloque B, incluyendo revisión de mobiliario.' },
    { id: 6, titulo: 'Junta con docentes de programación', area: 'Coordinación', responsable: 'Lic. Roberto Hernández', fecha: '21 Feb 2026', prioridad: 'Media' as const, estado: 'Pendiente' as const, descripcion: 'Reunión para revisar avances del semestre actual y definir estrategias para mejorar índices de aprobación.' },
    { id: 7, titulo: 'Actualización de nómina', area: 'Coordinación', responsable: 'Lic. Roberto Hernández', fecha: '18 Feb 2026', prioridad: 'Alta' as const, estado: 'Completado' as const, descripcion: 'Procesar la nómina quincenal del personal docente y administrativo.' },
];

/* ── Administrative sub-areas ───────────────────────── */
type Instancia = {
    id: number;
    titulo: string;
    descripcion: string;
    prioridad: 'Alta' | 'Media' | 'Baja';
    estado: 'Abierta' | 'En proceso' | 'Resuelta';
    fecha: string;
    solicitante: string;
};

const ADMIN_AREAS = [
    {
        id: 'coordinacion',
        title: 'Coordinación',
        icon: 'clipboard',
        color: '#0e6ba8',
        gradient: 'linear-gradient(135deg, #0e6ba8, #1e88e5)',
        encargado: { nombre: 'Lic. Roberto Hernández', puesto: 'Coordinador General', email: 'coordinacion@tecsum.edu.mx', tel: '55-1234-5678' },
        tareas: [
            'Planificación y seguimiento de actividades académicas',
            'Coordinación entre áreas y planteles',
            'Supervisión de programas educativos',
            'Gestión de reuniones con docentes',
            'Elaboración de reportes de desempeño',
        ],
        instancias: [
            { id: 1, titulo: 'Revisión de plan semestral', descripcion: 'Se requiere actualizar el plan de estudios para el próximo semestre.', prioridad: 'Alta' as const, estado: 'En proceso' as const, fecha: '17 Feb 2026', solicitante: 'Director' },
            { id: 2, titulo: 'Reunión con docentes', descripcion: 'Agendar reunión para revisión de avances.', prioridad: 'Media' as const, estado: 'Abierta' as const, fecha: '16 Feb 2026', solicitante: 'Director' },
        ],
    },
    {
        id: 'control-escolar',
        title: 'Control Escolar',
        icon: 'graduation',
        color: '#2e7d32',
        gradient: 'linear-gradient(135deg, #2e7d32, #43a047)',
        encargado: { nombre: 'Lic. Patricia Gómez', puesto: 'Jefa de Control Escolar', email: 'control@tecsum.edu.mx', tel: '55-2345-6789' },
        tareas: [
            'Inscripciones y reinscripciones de alumnos',
            'Emisión de constancias y certificados',
            'Control de calificaciones y boletas',
            'Gestión de expedientes académicos',
            'Trámites de titulación y bajas',
        ],
        instancias: [
            { id: 3, titulo: 'Certificados pendientes', descripcion: 'Hay 15 certificados en espera de firma.', prioridad: 'Alta' as const, estado: 'Abierta' as const, fecha: '18 Feb 2026', solicitante: 'Director' },
        ],
    },
    {
        id: 'publicidad',
        title: 'Publicidad',
        icon: 'megaphone',
        color: '#c62828',
        gradient: 'linear-gradient(135deg, #c62828, #e53935)',
        encargado: { nombre: 'Lic. Diana Torres', puesto: 'Responsable de Marketing', email: 'publicidad@tecsum.edu.mx', tel: '55-3456-7890' },
        tareas: [
            'Diseño de campañas publicitarias',
            'Gestión de redes sociales',
            'Organización de eventos promocionales',
            'Creación de material gráfico y audiovisual',
            'Relaciones públicas y vinculación',
        ],
        instancias: [],
    },
    {
        id: 'caja',
        title: 'Caja',
        icon: 'money',
        color: '#6a1b9a',
        gradient: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
        encargado: { nombre: 'C.P. Fernando Vega', puesto: 'Encargado de Caja', email: 'caja@tecsum.edu.mx', tel: '55-4567-8901' },
        tareas: [
            'Cobro de colegiaturas e inscripciones',
            'Emisión de recibos y facturas',
            'Control de pagos y adeudos',
            'Cortes de caja diarios',
            'Reportes financieros mensuales',
        ],
        instancias: [
            { id: 4, titulo: 'Reporte mensual enero', descripcion: 'Entregar reporte financiero del mes de enero.', prioridad: 'Media' as const, estado: 'Resuelta' as const, fecha: '15 Feb 2026', solicitante: 'Director' },
        ],
    },
    {
        id: 'limpieza',
        title: 'Limpieza',
        icon: 'sparkles',
        color: '#00838f',
        gradient: 'linear-gradient(135deg, #00838f, #00acc1)',
        encargado: { nombre: 'Sr. Miguel Ángel Pérez', puesto: 'Supervisor de Intendencia', email: 'intendencia@tecsum.edu.mx', tel: '55-5678-9012' },
        tareas: [
            'Limpieza de aulas y áreas comunes',
            'Mantenimiento preventivo de instalaciones',
            'Control de insumos de limpieza',
            'Supervisión de personal de intendencia',
            'Protocolo de sanitización',
        ],
        instancias: [],
    },
];

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function DirectorDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [globalSearch, setGlobalSearch] = useState('');
    const [activitySearch, setActivitySearch] = useState('');
    const [showNewInstancia, setShowNewInstancia] = useState<string | null>(null);
    const [instanciasData, setInstanciasData] = useState<Record<string, Instancia[]>>(
        Object.fromEntries(ADMIN_AREAS.map(a => [a.id, [...a.instancias]]))
    );
    const [newInstancia, setNewInstancia] = useState({ titulo: '', descripcion: '', prioridad: 'Media' as 'Alta' | 'Media' | 'Baja' });
    const [selectedCarrera, setSelectedCarrera] = useState('contabilidad');
    const [selectedDocente, setSelectedDocente] = useState<Docente | null>(null);
    const [selectedAlumno, setSelectedAlumno] = useState<any | null>(null);
    const [alumnoTab, setAlumnoTab] = useState<'expediente' | 'horario' | 'reportes' | 'desempeno'>('expediente');
    const [docenteTab, setDocenteTab] = useState<'horario' | 'planeacion' | 'desempeno' | 'carta'>('horario');
    const [cartaData, setCartaData] = useState({
        asignatura: '', modalidad: '', semestre: '', cuatrimestre: '', licenciatura: '', totalSesiones: '', horario: '', diasSemana: '', objetivo: '',
        parametros: { examen: 50, asistencia: 5, practicas: 20, tareas: 15, participacion: 10 },
        temas: [{ sem: 1, tema: '', objetivo: '', estrategias: '', evidencia: '' }]
    });
    const [expandedTarea, setExpandedTarea] = useState<number | null>(null);

    const handleLogout = () => { logout(); navigate('/login'); };

    // Chart helpers
    const maxVal = Math.max(...CHART_DATA.map(d => d.val));
    const minVal = Math.min(...CHART_DATA.map(d => d.val)) - 20;
    const chartW = 500;
    const chartH = 100;
    const points = CHART_DATA.map((d, i) => {
        const x = (i / (CHART_DATA.length - 1)) * chartW;
        const y = chartH - ((d.val - minVal) / (maxVal - minVal)) * chartH;
        return `${x},${y}`;
    });
    const linePath = `M ${points.join(' L ')}`;
    const areaPath = `${linePath} L ${chartW},${chartH} L 0,${chartH} Z`;

    // Filtered activity
    const filteredRecent = RECENT.filter(r => {
        const q = activitySearch.toLowerCase();
        if (!q) return true;
        return r.name.toLowerCase().includes(q) || r.person.toLowerCase().includes(q) || r.area.toLowerCase().includes(q) || r.status.toLowerCase().includes(q);
    });

    const filteredMenu = MENU_ITEMS.filter(m => {
        if (!globalSearch) return true;
        return m.label.toLowerCase().includes(globalSearch.toLowerCase());
    });

    const getPageTitle = () => {
        const item = MENU_ITEMS.find(m => m.id === activeMenu);
        return item ? item.label : 'Dashboard';
    };

    const addInstancia = (areaId: string) => {
        if (!newInstancia.titulo.trim()) return;
        const inst: Instancia = {
            id: Date.now(),
            titulo: newInstancia.titulo,
            descripcion: newInstancia.descripcion,
            prioridad: newInstancia.prioridad,
            estado: 'Abierta',
            fecha: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }),
            solicitante: user?.username || 'Director',
        };
        setInstanciasData(prev => ({ ...prev, [areaId]: [inst, ...(prev[areaId] || [])] }));
        setNewInstancia({ titulo: '', descripcion: '', prioridad: 'Media' });
        setShowNewInstancia(null);
    };

    const statusColor = (s: string) => {
        if (s === 'Completado' || s === 'Resuelta') return { bg: '#f0fdf4', text: '#16a34a' };
        if (s === 'Pendiente' || s === 'Abierta') return { bg: '#fffbeb', text: '#d97706' };
        return { bg: '#f0f9ff', text: '#0284c7' };
    };

    const prioColor = (p: string) => {
        if (p === 'Alta') return { bg: '#fef2f2', text: '#dc2626' };
        if (p === 'Media') return { bg: '#fffbeb', text: '#d97706' };
        return { bg: '#f0fdf4', text: '#16a34a' };
    };

    /* ── Render: Dashboard view ─────────────────────── */
    const renderDashboard = () => {
        const tPrioColor = (p: string) => {
            if (p === 'Alta') return { bg: '#fef2f2', text: '#dc2626', dot: '🔴' };
            if (p === 'Media') return { bg: '#fffbeb', text: '#d97706', dot: '🟡' };
            return { bg: '#f0fdf4', text: '#16a34a', dot: '🟢' };
        };
        const tStatusColor = (s: string) => {
            if (s === 'Completado') return { bg: '#f0fdf4', text: '#16a34a' };
            if (s === 'Pendiente') return { bg: '#fffbeb', text: '#d97706' };
            return { bg: '#f0f9ff', text: '#0284c7' };
        };

        return (
            <>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                        Bienvenido, {user?.username} 👋
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Aquí tienes un resumen de las áreas de TECSUM.</p>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
                    {STATS.map(s => (
                        <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: 8, fontWeight: 500 }}>{s.label}</p>
                                <p style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{s.value}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
                                    <span style={{ color: s.up ? '#22c55e' : '#ef4444', fontSize: '0.72rem', fontWeight: 600 }}>↑ {s.change}</span>
                                    <span style={{ color: '#cbd5e1', fontSize: '0.68rem' }}>vs. mes ant.</span>
                                </div>
                            </div>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f0f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0e6ba8' }}>
                                <Icon name={s.icon} size={20} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ═══ ROW 2: Chart (compact) + Classes + Activity ═══ */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>

                    {/* ── Compact Chart ── */}
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Icon name="chart" size={16} /> Alumnos inscritos
                            </h3>
                            <span style={{ fontSize: '0.65rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: 6, color: '#64748b', fontWeight: 500 }}>Sep - Feb</span>
                        </div>
                        {/* Big number */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0e6ba8' }}>620</span>
                            <span style={{ fontSize: '0.72rem', color: '#22c55e', fontWeight: 600, background: '#f0fdf4', padding: '2px 8px', borderRadius: 12 }}>↑ +12</span>
                        </div>
                        {/* Compact filled chart */}
                        <div style={{ flex: 1, minHeight: 0 }}>
                            <svg viewBox={`-5 -5 ${chartW + 10} ${chartH + 25}`} style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
                                <defs><linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0e6ba8" stopOpacity={0.35} /><stop offset="100%" stopColor="#0e6ba8" stopOpacity={0.03} /></linearGradient></defs>
                                <path d={areaPath} fill="url(#chartGrad2)" />
                                <path d={linePath} fill="none" stroke="#0e6ba8" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                                {CHART_DATA.map((d, i) => {
                                    const x = (i / (CHART_DATA.length - 1)) * chartW;
                                    const y = chartH - ((d.val - minVal) / (maxVal - minVal)) * chartH;
                                    return (<g key={i}><circle cx={x} cy={y} r={3.5} fill="#fff" stroke="#0e6ba8" strokeWidth={2} /><text x={x} y={chartH + 16} textAnchor="middle" fontSize={9} fill="#94a3b8" fontWeight={500}>{d.month}</text></g>);
                                })}
                            </svg>
                        </div>
                    </div>

                    {/* ── Clases en curso ── */}
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', flexDirection: 'column', maxHeight: 360 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Icon name="book" size={16} /> Clases en curso
                            </h3>
                            <span style={{ fontSize: '0.65rem', background: '#f0fdf4', padding: '3px 8px', borderRadius: 6, color: '#16a34a', fontWeight: 600 }}>🟢 Ahora</span>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6, paddingRight: 4 }}>
                            {CLASES_EN_CURSO.map((c, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                                    borderRadius: 10, border: '1px solid #f1f5f9', background: `${c.color}05`,
                                    transition: 'all 0.15s', cursor: 'default',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = `${c.color}10`; e.currentTarget.style.borderColor = `${c.color}25`; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = `${c.color}05`; e.currentTarget.style.borderColor = '#f1f5f9'; }}
                                >
                                    <div style={{ width: 4, height: 32, borderRadius: 4, background: c.color, flexShrink: 0 }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0f172a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.materia}</p>
                                        <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: 0 }}>{c.docente}</p>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <p style={{ fontSize: '0.68rem', fontWeight: 600, color: c.color, margin: 0 }}>{c.aula}</p>
                                        <p style={{ fontSize: '0.6rem', color: '#cbd5e1', margin: 0 }}>{c.grupo}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Actividad reciente ── */}
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '16px 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Actividad reciente</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: '3px 8px' }}>
                                <Icon name="search" size={11} />
                                <input type="text" placeholder="Buscar..." value={activitySearch} onChange={e => setActivitySearch(e.target.value)} style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.68rem', color: '#334155', width: 60, fontFamily: 'inherit' }} />
                            </div>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <th style={{ textAlign: 'left', padding: '6px 0', color: '#94a3b8', fontWeight: 500, fontSize: '0.68rem' }}>Actividad</th>
                                    <th style={{ textAlign: 'left', padding: '6px 0', color: '#94a3b8', fontWeight: 500, fontSize: '0.68rem' }}>Persona</th>
                                    <th style={{ textAlign: 'left', padding: '6px 0', color: '#94a3b8', fontWeight: 500, fontSize: '0.68rem' }}>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecent.length === 0 ? (
                                    <tr><td colSpan={3} style={{ textAlign: 'center', padding: 16, color: '#cbd5e1' }}>No se encontraron resultados</td></tr>
                                ) : filteredRecent.map((r, i) => {
                                    const sc = statusColor(r.status);
                                    return (
                                        <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                                            <td style={{ padding: '8px 0' }}>
                                                <div style={{ fontWeight: 500, color: '#334155', fontSize: '0.75rem' }}>{r.name}</div>
                                                <div style={{ fontSize: '0.62rem', color: '#cbd5e1', marginTop: 1 }}>{r.date}</div>
                                            </td>
                                            <td style={{ padding: '8px 0', color: '#64748b' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 600, color: '#64748b' }}>{r.person.charAt(0)}</div>
                                                    <span style={{ fontSize: '0.72rem' }}>{r.person}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '8px 0' }}>
                                                <span style={{ fontSize: '0.62rem', fontWeight: 500, padding: '2px 7px', borderRadius: 20, background: sc.bg, color: sc.text }}>{r.status}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ═══ ROW 3: Tareas asignadas ═══ */}
                <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Icon name="clipboard" size={17} /> Tareas asignadas
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: '0.68rem', color: '#94a3b8', background: '#f8fafc', padding: '4px 10px', borderRadius: 20 }}>
                                {TAREAS_ASIGNADAS.filter(t => t.estado !== 'Completado').length} pendientes
                            </span>
                            <span style={{ fontSize: '0.68rem', color: '#16a34a', background: '#f0fdf4', padding: '4px 10px', borderRadius: 20 }}>
                                {TAREAS_ASIGNADAS.filter(t => t.estado === 'Completado').length} completadas
                            </span>
                        </div>
                    </div>
                    <div style={{ maxHeight: 380, overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                            <colgroup>
                                <col style={{ width: '26%' }} />
                                <col style={{ width: '13%' }} />
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '13%' }} />
                                <col style={{ width: '13%' }} />
                                <col style={{ width: '15%' }} />
                            </colgroup>
                            <thead>
                                <tr style={{ background: '#f8fafc' }}>
                                    <th style={{ textAlign: 'left', padding: '10px 24px', fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tarea</th>
                                    <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Área</th>
                                    <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Responsable</th>
                                    <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Fecha</th>
                                    <th style={{ textAlign: 'center', padding: '10px 12px', fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Prioridad</th>
                                    <th style={{ textAlign: 'center', padding: '10px 12px', fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TAREAS_ASIGNADAS.map(t => {
                                    const isOpen = expandedTarea === t.id;
                                    const pc = tPrioColor(t.prioridad);
                                    const sc = tStatusColor(t.estado);
                                    return (
                                        <React.Fragment key={t.id}>
                                            <tr style={{ cursor: 'pointer', transition: 'background 0.15s', borderBottom: isOpen ? 'none' : '1px solid #f1f5f9' }}
                                                onClick={() => setExpandedTarea(isOpen ? null : t.id)}
                                                onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = '#fafbfc'; }}
                                                onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = ''; }}
                                            >
                                                <td style={{ padding: '12px 24px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <span style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s', display: 'flex', color: '#94a3b8', flexShrink: 0 }}>
                                                            <Icon name="chevron" size={14} />
                                                        </span>
                                                        <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#0f172a' }}>{t.titulo}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '12px', fontSize: '0.78rem', color: '#64748b' }}>{t.area}</td>
                                                <td style={{ padding: '12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 600, color: '#64748b' }}>{t.responsable.charAt(0)}</div>
                                                        <span style={{ fontSize: '0.78rem', color: '#334155' }}>{t.responsable}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '12px', fontSize: '0.75rem', color: '#94a3b8' }}>{t.fecha}</td>
                                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                                    <span style={{ fontSize: '0.68rem', fontWeight: 500, padding: '3px 10px', borderRadius: 20, background: pc.bg, color: pc.text }}>{pc.dot} {t.prioridad}</span>
                                                </td>
                                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                                    <span style={{ fontSize: '0.68rem', fontWeight: 500, padding: '3px 10px', borderRadius: 20, background: sc.bg, color: sc.text }}>{t.estado}</span>
                                                </td>
                                            </tr>
                                            {/* Expanded detail */}
                                            {isOpen && (
                                                <tr>
                                                    <td colSpan={6} style={{ padding: '0 24px 16px 50px', borderBottom: '1px solid #e2e8f0', background: '#fafbfc' }}>
                                                        <div style={{ padding: '16px 20px', background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                                                            <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Descripción de la tarea</p>
                                                            <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>{t.descripcion}</p>
                                                            <div style={{ display: 'flex', gap: 16, marginTop: 14, paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                    <Icon name="person" size={13} />
                                                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}><strong>{t.responsable}</strong></span>
                                                                </div>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                    <Icon name="tag" size={13} />
                                                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.area}</span>
                                                                </div>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                    <Icon name="clock" size={13} />
                                                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Vence: {t.fecha}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    };

    /* ── Render: Premium Admin Card ─────────────────── */
    const renderAdminCard = (area: typeof ADMIN_AREAS[0]) => {
        const isExpanded = expandedCard === area.id;
        const areaInstancias = instanciasData[area.id] || [];
        const openCount = areaInstancias.filter(i => i.estado !== 'Resuelta').length;

        return (
            <div
                key={area.id}
                style={{
                    background: '#fff',
                    borderRadius: 16,
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: isExpanded ? '0 8px 32px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.04)',
                    gridColumn: isExpanded ? '1 / -1' : 'auto',
                }}
            >
                {/* Card Header with gradient */}
                <div style={{ background: area.gradient, padding: '20px 24px', position: 'relative', overflow: 'hidden' }}>
                    {/* Floating decorative circles */}
                    <div style={{ position: 'absolute', top: -15, right: -15, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                    <div style={{ position: 'absolute', bottom: -20, right: 40, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                <Icon name={area.icon} size={22} />
                            </div>
                            <div>
                                <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>{area.title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem', margin: 0 }}>{area.encargado.nombre}</p>
                            </div>
                        </div>
                        {openCount > 0 && (
                            <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: '3px 10px', fontSize: '0.68rem', color: '#fff', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
                                {openCount} abiertas
                            </div>
                        )}
                    </div>
                </div>

                {/* Card Body — always visible info */}
                <div style={{ padding: '16px 24px' }}>
                    {/* Encargado row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: '50%',
                            background: `${area.color}15`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: area.color, fontSize: '0.7rem', fontWeight: 700,
                        }}>
                            {area.encargado.nombre.split(' ').filter((_, i) => i === 0 || i === 1).map(n => n[0]).join('')}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.82rem', margin: 0 }}>{area.encargado.nombre}</p>
                            <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0 }}>{area.encargado.puesto}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                            <a href={`mailto:${area.encargado.email}`} style={{ width: 30, height: 30, borderRadius: 8, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textDecoration: 'none', transition: 'all 0.15s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = `${area.color}15`; e.currentTarget.style.color = area.color; }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#64748b'; }}
                            >
                                <Icon name="mail" size={14} />
                            </a>
                            <a href={`tel:${area.encargado.tel}`} style={{ width: 30, height: 30, borderRadius: 8, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textDecoration: 'none', transition: 'all 0.15s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = `${area.color}15`; e.currentTarget.style.color = area.color; }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#64748b'; }}
                            >
                                <Icon name="phone" size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Quick tareas preview */}
                    <div style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <p style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tareas principales</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {area.tareas.slice(0, 3).map((t, i) => (
                                <span key={i} style={{ fontSize: '0.68rem', background: '#f8fafc', color: '#64748b', padding: '4px 10px', borderRadius: 20, border: '1px solid #f1f5f9' }}>{t.length > 35 ? t.substring(0, 35) + '…' : t}</span>
                            ))}
                            {area.tareas.length > 3 && (
                                <span style={{ fontSize: '0.68rem', color: area.color, padding: '4px 8px', fontWeight: 500 }}>+{area.tareas.length - 3} más</span>
                            )}
                        </div>
                    </div>

                    {/* Action row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12 }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowNewInstancia(area.id); }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6, border: 'none',
                                background: area.gradient, color: '#fff',
                                padding: '8px 16px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 600,
                                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <Icon name="plus" size={14} />
                            Nueva instancia
                        </button>
                        <button
                            onClick={() => setExpandedCard(isExpanded ? null : area.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 4, border: 'none',
                                background: 'transparent', color: area.color,
                                fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                                padding: '8px 12px', borderRadius: 8, transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = `${area.color}08`}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            {isExpanded ? 'Ver menos' : 'Ver más'}
                            <span style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'flex' }}>
                                <Icon name="chevron" size={14} />
                            </span>
                        </button>
                    </div>
                </div>

                {/* ── Expanded section ──────────────────────── */}
                {isExpanded && (
                    <div style={{ borderTop: '1px solid #f1f5f9', padding: '20px 24px', background: '#fafbfc' }}>
                        {/* Full tareas */}
                        <div style={{ marginBottom: 20 }}>
                            <h4 style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Icon name="clipboard" size={15} /> Todas las tareas
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                {area.tareas.map((tarea, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#fff', borderRadius: 8, fontSize: '0.8rem', color: '#334155', border: '1px solid #e2e8f0' }}>
                                        <span style={{ color: area.color, flexShrink: 0 }}><Icon name="check" size={14} /></span>
                                        {tarea}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact info */}
                        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.8rem' }}>
                                <span style={{ color: area.color }}><Icon name="mail" size={15} /></span>
                                <span style={{ color: '#334155' }}>{area.encargado.email}</span>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.8rem' }}>
                                <span style={{ color: area.color }}><Icon name="phone" size={15} /></span>
                                <span style={{ color: '#334155' }}>{area.encargado.tel}</span>
                            </div>
                        </div>

                        {/* Instancias section */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <h4 style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Icon name="tag" size={15} /> Instancias ({areaInstancias.length})
                                </h4>
                            </div>

                            {/* New instancia form */}
                            {/* Instancias list */}
                            {areaInstancias.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: 20, background: '#fff', borderRadius: 10, border: '1px dashed #e2e8f0' }}>
                                    <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: 0 }}>No hay instancias abiertas</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {areaInstancias.map(inst => {
                                        const sc = statusColor(inst.estado);
                                        const pc = prioColor(inst.prioridad);
                                        return (
                                            <div key={inst.id} style={{ background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', padding: '14px 18px', transition: 'all 0.15s' }}
                                                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'}
                                                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                            <h5 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>{inst.titulo}</h5>
                                                            <span style={{ fontSize: '0.62rem', fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: pc.bg, color: pc.text }}>{inst.prioridad}</span>
                                                        </div>
                                                        <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>{inst.descripcion}</p>
                                                    </div>
                                                    <span style={{ fontSize: '0.68rem', fontWeight: 500, padding: '3px 10px', borderRadius: 20, background: sc.bg, color: sc.text, flexShrink: 0 }}>{inst.estado}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10, fontSize: '0.7rem', color: '#94a3b8' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <Icon name="clock" size={12} /> {inst.fecha}
                                                    </span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <Icon name="person" size={12} /> {inst.solicitante}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    /* ── Render: Administrativos view ───────────────── */
    const renderAdminView = () => (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Administrativos</h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Gestión de las áreas administrativas de TECSUM.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: expandedCard ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
                {ADMIN_AREAS.map(area => renderAdminCard(area))}
            </div>
        </>
    );

    /* ── Render: Docentes view ─────────────────────── */
    const renderDocentesView = () => {
        // If a docente is selected, show the detail view with tabs
        if (selectedDocente) {
            const doc = selectedDocente;
            const carrera = CARRERAS.find(c => c.id === doc.carrera)!;

            // Generate color map for each materia
            const materiaColors: Record<string, string> = {};
            const palette = ['#0e6ba8', '#c62828', '#6a1b9a', '#2e7d32', '#e65100', '#00838f', '#ad1457', '#283593'];
            doc.materias.forEach((m, i) => { materiaColors[m.nombre] = palette[i % palette.length]; });

            // Build schedule map for each day
            const buildDayMap = (day: string) => {
                const map: Record<number, { materia: string; grupo: string }> = {};
                const dayEntries = doc.horario[day] || [];
                dayEntries.forEach(entry => { entry.slots.forEach(s => { map[s] = { materia: entry.materia, grupo: entry.grupo }; }); });
                return map;
            };

            const DOCENTE_TABS = [
                { id: 'horario' as const, label: 'Horario', icon: 'clock' },
                { id: 'planeacion' as const, label: 'Planeación', icon: 'clipboard' },
                { id: 'desempeno' as const, label: 'Desempeño', icon: 'chart' },
                { id: 'carta' as const, label: 'Carta Descriptiva', icon: 'file-text' },
            ];

            return (
                <>
                    {/* Back button */}
                    <button className="no-print" onClick={() => { setSelectedDocente(null); setDocenteTab('horario'); }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = carrera.color; e.currentTarget.style.color = carrera.color; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}
                    >← Volver a docentes</button>

                    {/* Header card */}
                    <div className="no-print" style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: 24 }}>
                        <div style={{ background: carrera.gradient, padding: '28px 32px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                            <div style={{ position: 'absolute', bottom: -15, right: 60, width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 1 }}>
                                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.1rem', fontWeight: 800 }}>
                                    {doc.nombre.split(' ').filter((_, i) => i === 0 || i === 1).map(n => n[0]).join('')}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{doc.nombre}</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', margin: '2px 0 0' }}>{doc.especialidad} · {carrera.label}</p>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,0.15)', borderRadius: 10, backdropFilter: 'blur(4px)' }}>
                                        <Icon name="mail" size={14} />
                                        <span style={{ color: '#fff', fontSize: '0.78rem' }}>{doc.email}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,0.15)', borderRadius: 10, backdropFilter: 'blur(4px)' }}>
                                        <Icon name="phone" size={14} />
                                        <span style={{ color: '#fff', fontSize: '0.78rem' }}>{doc.tel}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#fafbfc' }}>
                            {DOCENTE_TABS.map(t => (
                                <button key={t.id} onClick={() => setDocenteTab(t.id)}
                                    style={{
                                        flex: 1, padding: '14px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                        border: 'none', borderBottom: docenteTab === t.id ? `3px solid ${carrera.color}` : '3px solid transparent',
                                        background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                                        color: docenteTab === t.id ? carrera.color : '#94a3b8', fontSize: '0.85rem', fontWeight: docenteTab === t.id ? 700 : 500,
                                    }}
                                ><Icon name={t.icon} size={16} /> {t.label}</button>
                            ))}
                        </div>
                    </div>

                    {/* Tab content */}
                    {docenteTab === 'horario' && (
                        <>
                            {/* Materias legend */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                                {doc.materias.map((m, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: `${materiaColors[m.nombre]}10`, borderRadius: 20, border: `1px solid ${materiaColors[m.nombre]}25` }}>
                                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: materiaColors[m.nombre] }} />
                                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: materiaColors[m.nombre] }}>{m.nombre}</span>
                                        <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>({m.grupo})</span>
                                    </div>
                                ))}
                            </div>

                            {/* Weekly schedule grid */}
                            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                {/* Header row with days */}
                                <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(5, 1fr)', borderBottom: '2px solid #e2e8f0' }}>
                                    <div style={{ padding: '14px 16px', background: '#f8fafc', fontWeight: 700, fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Hora</div>
                                    {DAYS.map(d => (
                                        <div key={d} style={{ padding: '14px 8px', background: '#f8fafc', fontWeight: 700, fontSize: '0.8rem', color: '#0f172a', textAlign: 'center', borderLeft: '1px solid #e2e8f0' }}>
                                            {DAY_LABELS[d]}
                                        </div>
                                    ))}
                                </div>

                                {/* Time slots rows */}
                                {TIME_SLOTS.map(slot => {
                                    const isBreak = slot.idx === -1;
                                    return (
                                        <div key={slot.hora} style={{ display: 'grid', gridTemplateColumns: '120px repeat(5, 1fr)', borderBottom: '1px solid #f1f5f9', background: isBreak ? '#fffbeb' : '#fff' }}>
                                            <div style={{ padding: '12px 12px', fontSize: '0.75rem', fontWeight: isBreak ? 700 : 600, color: isBreak ? '#d97706' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #e2e8f0' }}>
                                                {isBreak ? '☕ RECESO' : slot.hora}
                                            </div>
                                            {DAYS.map(day => {
                                                if (isBreak) {
                                                    return <div key={day} style={{ padding: '12px 8px', borderLeft: '1px solid #f1f5f9', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span style={{ fontSize: '0.72rem', color: '#d97706', fontStyle: 'italic' }}>10:30 - 11:00</span>
                                                    </div>;
                                                }
                                                const dayMap = buildDayMap(day);
                                                const entry = dayMap[slot.idx];
                                                if (entry) {
                                                    const col = materiaColors[entry.materia] || carrera.color;
                                                    return (
                                                        <div key={day} style={{ padding: '8px 6px', borderLeft: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: `${col}12`, borderLeft: `3px solid ${col}`, textAlign: 'left' }}>
                                                                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: col, margin: 0, lineHeight: 1.3 }}>{entry.materia}</p>
                                                                <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: '2px 0 0' }}>Grupo {entry.grupo}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return <div key={day} style={{ padding: '12px 8px', borderLeft: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <span style={{ fontSize: '0.72rem', color: '#e2e8f0' }}>—</span>
                                                </div>;
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {docenteTab === 'planeacion' && (
                        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '40px 32px' }}>
                            <div style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
                                <div style={{ width: 64, height: 64, borderRadius: 16, background: `${carrera.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    <Icon name="clipboard" size={28} />
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Planeación Académica</h3>
                                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 24 }}>
                                    Aquí se mostrarán las planeaciones didácticas, avances programáticos y secuencias de aprendizaje de {doc.nombre}.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    {[
                                        { label: 'Planeaciones entregadas', valor: `${doc.materias.length}/${doc.materias.length}`, icon: '📋' },
                                        { label: 'Avance programático', valor: '68%', icon: '📊', action: () => setDocenteTab('carta') },
                                        { label: 'Secuencias didácticas', valor: `${doc.materias.length}`, icon: '📚' },
                                        { label: 'Última actualización', valor: '15 Feb 2026', icon: '📅' },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={item.action}
                                            style={{
                                                padding: '16px',
                                                background: '#f8fafc',
                                                borderRadius: 12,
                                                border: '1px solid #f1f5f9',
                                                textAlign: 'left',
                                                cursor: item.action ? 'pointer' : 'default',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => { if (item.action) { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; } }}
                                            onMouseLeave={(e) => { if (item.action) { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; } }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                                                <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>{item.label}</span>
                                            </div>
                                            <p style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>{item.valor}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {docenteTab === 'desempeno' && (
                        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Icon name="chart" size={18} /> Desempeño de Alumnos
                                </h3>
                                <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: '#f8fafc', padding: '4px 12px', borderRadius: 20 }}>Periodo: Ene - Jun 2026</span>
                            </div>

                            {doc.materias.map((m, i) => {
                                const aprobados = Math.floor(Math.random() * 10) + 20;
                                const total = aprobados + Math.floor(Math.random() * 6) + 2;
                                const pct = Math.round((aprobados / total) * 100);
                                const promedio = (7 + Math.random() * 2.5).toFixed(1);
                                return (
                                    <div key={i} style={{ padding: '20px', background: '#fafbfc', borderRadius: 12, border: '1px solid #f1f5f9', marginBottom: 12 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                            <div>
                                                <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>{m.nombre}</h4>
                                                <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: '2px 0 0' }}>Grupo {m.grupo} · {total} alumnos</p>
                                            </div>
                                            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: 0 }}>Promedio</p>
                                                    <p style={{ fontSize: '1.1rem', fontWeight: 800, color: Number(promedio) >= 8 ? '#2e7d32' : Number(promedio) >= 7 ? '#e65100' : '#c62828', margin: 0 }}>{promedio}</p>
                                                </div>
                                                <div style={{ textAlign: 'center' }}>
                                                    <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: 0 }}>Aprobación</p>
                                                    <p style={{ fontSize: '1.1rem', fontWeight: 800, color: pct >= 80 ? '#2e7d32' : pct >= 60 ? '#e65100' : '#c62828', margin: 0 }}>{pct}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Progress bar */}
                                        <div style={{ height: 8, borderRadius: 4, background: '#e2e8f0', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${pct}%`, borderRadius: 4, background: pct >= 80 ? 'linear-gradient(90deg, #2e7d32, #43a047)' : pct >= 60 ? 'linear-gradient(90deg, #e65100, #ff9800)' : 'linear-gradient(90deg, #c62828, #e53935)', transition: 'width 0.8s ease' }} />
                                        </div>
                                        <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
                                            <span style={{ fontSize: '0.7rem', color: '#2e7d32' }}>✅ {aprobados} aprobados</span>
                                            <span style={{ fontSize: '0.7rem', color: '#c62828' }}>❌ {total - aprobados} reprobados</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {docenteTab === 'carta' && (
                        <div style={{ background: '#fff', padding: '40px', borderRadius: 14, border: '1px solid #e2e8f0', maxWidth: '210mm', margin: '0 auto', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            {/* Print Header */}
                            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
                                    <img src="/img/Tecsum_Logo.webp" alt="TECSUM" style={{ height: 50 }} />
                                    <div>
                                        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00072d', margin: 0, textTransform: 'uppercase' }}>Centro Tecnológico de Estudios Superiores</h2>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#00072d', margin: 0 }}>del Valle de México</h3>
                                    </div>
                                </div>
                                <h1 style={{ fontSize: '1.2rem', fontWeight: 800, textDecoration: 'underline', margin: '16px 0 4px' }}>CARTA DESCRIPTIVA</h1>
                                <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>CICLO 2026-2026 SEM-A</p>
                            </div>

                            {/* Form Fields */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.85rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', gap: 8, borderBottom: '1px solid #000' }}>
                                    <strong style={{ whiteSpace: 'nowrap' }}>DOCENTE:</strong>
                                    <div style={{ padding: '4px 0', fontWeight: 600 }}>{doc.nombre}</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', gap: 8, borderBottom: '1px solid #000' }}>
                                    <strong style={{ whiteSpace: 'nowrap' }}>ASIGNATURA:</strong>
                                    <input type="text" value={cartaData.asignatura} onChange={e => setCartaData({ ...cartaData, asignatura: e.target.value })} style={{ border: 'none', width: '100%', outline: 'none', fontFamily: 'inherit', background: 'transparent' }} placeholder="Nombre de la asignatura" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, border: '1px solid #000', padding: 0 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ background: '#f0f0f0', fontWeight: 700, padding: '4px 8px', borderBottom: '1px solid #000', fontSize: '0.75rem', textAlign: 'center' }}>MODALIDAD</div>
                                        <input type="text" value={cartaData.modalidad} onChange={e => setCartaData({ ...cartaData, modalidad: e.target.value })} style={{ border: 'none', padding: '8px', textAlign: 'center', outline: 'none', fontFamily: 'inherit' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid #000' }}>
                                        <div style={{ background: '#f0f0f0', fontWeight: 700, padding: '4px 8px', borderBottom: '1px solid #000', fontSize: '0.75rem', textAlign: 'center' }}>SEMESTRE</div>
                                        <input type="text" value={cartaData.semestre} onChange={e => setCartaData({ ...cartaData, semestre: e.target.value })} style={{ border: 'none', padding: '8px', textAlign: 'center', outline: 'none', fontFamily: 'inherit' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid #000' }}>
                                        <div style={{ background: '#f0f0f0', fontWeight: 700, padding: '4px 8px', borderBottom: '1px solid #000', fontSize: '0.75rem', textAlign: 'center' }}>CUATRIMESTRE</div>
                                        <input type="text" value={cartaData.cuatrimestre} onChange={e => setCartaData({ ...cartaData, cuatrimestre: e.target.value })} style={{ border: 'none', padding: '8px', textAlign: 'center', outline: 'none', fontFamily: 'inherit' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid #000' }}>
                                        <div style={{ background: '#f0f0f0', fontWeight: 700, padding: '4px 8px', borderBottom: '1px solid #000', fontSize: '0.75rem', textAlign: 'center' }}>LICENCIATURA</div>
                                        <div style={{ padding: '8px', textAlign: 'center', fontWeight: 600 }}>{carrera.label.toUpperCase()}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, border: '1px solid #000', borderTop: 'none' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ background: '#f0f0f0', fontWeight: 700, padding: '4px 8px', borderBottom: '1px solid #000', fontSize: '0.75rem', textAlign: 'center' }}>TOTAL SESIONES</div>
                                        <input type="text" value={cartaData.totalSesiones} onChange={e => setCartaData({ ...cartaData, totalSesiones: e.target.value })} style={{ border: 'none', padding: '8px', textAlign: 'center', outline: 'none', fontFamily: 'inherit' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid #000' }}>
                                        <div style={{ background: '#f0f0f0', fontWeight: 700, padding: '4px 8px', borderBottom: '1px solid #000', fontSize: '0.75rem', textAlign: 'center' }}>HORARIO</div>
                                        <input type="text" value={cartaData.horario} onChange={e => setCartaData({ ...cartaData, horario: e.target.value })} style={{ border: 'none', padding: '8px', textAlign: 'center', outline: 'none', fontFamily: 'inherit' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid #000' }}>
                                        <div style={{ background: '#f0f0f0', fontWeight: 700, padding: '4px 8px', borderBottom: '1px solid #000', fontSize: '0.75rem', textAlign: 'center' }}>DIAS DE LA SEMANA</div>
                                        <input type="text" value={cartaData.diasSemana} onChange={e => setCartaData({ ...cartaData, diasSemana: e.target.value })} style={{ border: 'none', padding: '8px', textAlign: 'center', outline: 'none', fontFamily: 'inherit' }} />
                                    </div>
                                </div>

                                <div style={{ marginTop: 16 }}>
                                    <strong style={{ display: 'block', marginBottom: 4 }}>OBJETIVO DE LA ASIGNATURA</strong>
                                    <textarea value={cartaData.objetivo} onChange={e => setCartaData({ ...cartaData, objetivo: e.target.value })}
                                        style={{ width: '100%', border: '1px solid #000', minHeight: 80, padding: 8, resize: 'vertical', fontFamily: 'inherit', outline: 'none' }} />
                                </div>

                                {/* Evaluation Parameters */}
                                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                                    <div style={{ width: '50%' }}>
                                        <strong style={{ display: 'block', marginBottom: 4, textAlign: 'center' }}>PARÁMETROS DE EVALUACIÓN (Porcentajes):</strong>
                                        <div style={{ border: '2px solid #2e5c91', padding: 12 }}>
                                            {Object.entries(cartaData.parametros).map(([key, val]) => (
                                                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                    <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{key}:</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <input type="number" value={val} onChange={e => setCartaData({ ...cartaData, parametros: { ...cartaData.parametros, [key]: Number(e.target.value) } })}
                                                            style={{ width: 40, border: 'none', borderBottom: '1px solid #000', textAlign: 'right', fontWeight: 700, outline: 'none' }} />
                                                        <span>%</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <div style={{ borderTop: '2px solid #000', marginTop: 4, paddingTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                                                <strong>Total:</strong>
                                                <strong>{Object.values(cartaData.parametros).reduce((a, b) => a + b, 0)}%</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Units Table */}
                                <div style={{ marginTop: 24 }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ border: '1px solid #000', padding: 8, background: '#f0f0f0' }}>SEM.</th>
                                                <th style={{ border: '1px solid #000', padding: 8, background: '#f0f0f0' }}>TEMA / OBJETIVO</th>
                                                <th style={{ border: '1px solid #000', padding: 8, background: '#f0f0f0' }}>ESTRATEGIAS DE ENSEÑANZA</th>
                                                <th style={{ border: '1px solid #000', padding: 8, background: '#f0f0f0' }}>ESTRATEGIAS DE APRENDIZAJE</th>
                                                <th style={{ border: '1px solid #000', padding: 8, background: '#f0f0f0' }}>EVIDENCIA DEL LOGRO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartaData.temas.map((t, i) => (
                                                <tr key={i}>
                                                    <td style={{ border: '1px solid #000', padding: 4, textAlign: 'center', fontWeight: 700 }}>
                                                        <input type="number" value={t.sem} onChange={e => { const newTemas = [...cartaData.temas]; newTemas[i].sem = Number(e.target.value); setCartaData({ ...cartaData, temas: newTemas }); }} style={{ width: 40, textAlign: 'center', border: 'none', outline: 'none' }} />
                                                    </td>
                                                    <td style={{ border: '1px solid #000', padding: 4 }}>
                                                        <input placeholder="Tema" type="text" value={t.tema} onChange={e => { const newTemas = [...cartaData.temas]; newTemas[i].tema = e.target.value; setCartaData({ ...cartaData, temas: newTemas }); }} style={{ width: '100%', border: 'none', outline: 'none', fontWeight: 600, marginBottom: 4 }} />
                                                        <div style={{ height: 1, background: '#ccc', margin: '4px 0' }} />
                                                        <textarea placeholder="Objetivo del tema..." value={t.objetivo} onChange={e => { const newTemas = [...cartaData.temas]; newTemas[i].objetivo = e.target.value; setCartaData({ ...cartaData, temas: newTemas }); }} style={{ width: '100%', border: 'none', outline: 'none', resize: 'vertical', minHeight: 60, fontSize: '0.8rem' }} />
                                                    </td>
                                                    <td style={{ border: '1px solid #000', padding: 4 }}>
                                                        <textarea value={t.estrategias} onChange={e => { const newTemas = [...cartaData.temas]; newTemas[i].estrategias = e.target.value; setCartaData({ ...cartaData, temas: newTemas }); }} style={{ width: '100%', border: 'none', outline: 'none', resize: 'vertical', minHeight: 80 }} />
                                                    </td>
                                                    <td style={{ border: '1px solid #000', padding: 4 }}>
                                                        <textarea placeholder="(Mismas que enseñanza o diferentes...)" style={{ width: '100%', border: 'none', outline: 'none', resize: 'vertical', minHeight: 80 }} />
                                                    </td>
                                                    <td style={{ border: '1px solid #000', padding: 4 }}>
                                                        <textarea value={t.evidencia} onChange={e => { const newTemas = [...cartaData.temas]; newTemas[i].evidencia = e.target.value; setCartaData({ ...cartaData, temas: newTemas }); }} style={{ width: '100%', border: 'none', outline: 'none', resize: 'vertical', minHeight: 80 }} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button className="no-print" onClick={() => setCartaData({ ...cartaData, temas: [...cartaData.temas, { sem: cartaData.temas.length + 1, tema: '', objetivo: '', estrategias: '', evidencia: '' }] })}
                                        style={{ marginTop: 8, fontSize: '0.75rem', padding: '6px 12px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Icon name="plus" size={12} /> Agregar Fila
                                    </button>
                                </div>
                            </div>
                            {/* Print Button */}
                            <div className="no-print" style={{ textAlign: 'center', marginTop: 40 }}>
                                <button onClick={() => window.print()} style={{ background: '#0f172a', color: '#fff', padding: '12px 24px', borderRadius: 10, border: 'none', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                    <Icon name="printer" size={16} /> Imprimir Carta Descriptiva
                                </button>
                            </div>
                        </div>
                    )}
                </>
            );
        }

        // List view — no docente selected
        const carrera = CARRERAS.find(c => c.id === selectedCarrera)!;
        const docentesCarrera = DOCENTES.filter(d => d.carrera === selectedCarrera);

        return (
            <>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Docentes</h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Gestión de docentes por carrera.</p>
                </div>

                {/* Career tabs */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                    {CARRERAS.map(c => (
                        <button key={c.id} onClick={() => setSelectedCarrera(c.id)}
                            style={{
                                padding: '10px 20px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                                fontSize: '0.82rem', fontWeight: selectedCarrera === c.id ? 700 : 500, transition: 'all 0.2s',
                                background: selectedCarrera === c.id ? c.gradient : '#fff',
                                color: selectedCarrera === c.id ? '#fff' : '#64748b',
                                boxShadow: selectedCarrera === c.id ? `0 4px 14px ${c.color}40` : '0 1px 3px rgba(0,0,0,0.04)',
                                border: selectedCarrera === c.id ? 'none' : '1px solid #e2e8f0',
                            }}
                        >{c.label}</button>
                    ))}
                </div>

                {/* Teachers table */}
                <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ background: carrera.gradient, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, margin: 0 }}>Docentes de {carrera.label}</h3>
                        <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: '0.72rem', fontWeight: 600 }}>{docentesCarrera.length} docentes</span>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                <th style={{ textAlign: 'left', padding: '14px 24px', color: '#94a3b8', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Docente</th>
                                <th style={{ textAlign: 'left', padding: '14px 16px', color: '#94a3b8', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Especialidad</th>
                                <th style={{ textAlign: 'left', padding: '14px 16px', color: '#94a3b8', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Materias</th>
                                <th style={{ textAlign: 'left', padding: '14px 16px', color: '#94a3b8', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contacto</th>
                                <th style={{ padding: '14px 16px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {docentesCarrera.map(doc => (
                                <tr key={doc.id} style={{ borderBottom: '1px solid #f8fafc', cursor: 'pointer', transition: 'background 0.15s' }}
                                    onClick={() => { setSelectedDocente(doc); setDocenteTab('horario'); }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '14px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${carrera.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: carrera.color, fontSize: '0.7rem', fontWeight: 700 }}>
                                                {doc.nombre.split(' ').filter((_, i) => i === 0 || i === 1).map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 600, color: '#0f172a', margin: 0 }}>{doc.nombre}</p>
                                                <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0 }}>{doc.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 16px', color: '#334155' }}>{doc.especialidad}</td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                            {doc.materias.map((m, i) => (
                                                <span key={i} style={{ fontSize: '0.68rem', background: `${carrera.color}10`, color: carrera.color, padding: '3px 8px', borderRadius: 12, fontWeight: 500 }}>{m.nombre}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <a href={`mailto:${doc.email}`} onClick={e => e.stopPropagation()} style={{ width: 28, height: 28, borderRadius: 6, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textDecoration: 'none' }}><Icon name="mail" size={13} /></a>
                                            <a href={`tel:${doc.tel}`} onClick={e => e.stopPropagation()} style={{ width: 28, height: 28, borderRadius: 6, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textDecoration: 'none' }}><Icon name="phone" size={13} /></a>
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <span style={{ color: carrera.color, display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.75rem', fontWeight: 500 }}>Ver <Icon name="chevron" size={14} /></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    };

    /* ── Render: Alumnos view ──────────────────────── */
    const renderAlumnosView = () => {
        if (selectedAlumno) {
            const alu = selectedAlumno;
            const carrera = CARRERAS.find(c => c.id === alu.carrera) || CARRERAS.find(c => c.id === selectedCarrera) || CARRERAS[0];
            const ALUMNO_TABS = [
                { id: 'expediente', label: 'Expediente', icon: 'file-text', color: '#1e293b' },
                { id: 'horario', label: 'Horario', icon: 'clock', color: '#2563eb' },
                { id: 'reportes', label: 'Reportes', icon: 'alert-triangle', color: '#ea580c' },
                { id: 'desempeno', label: 'Desempeño', icon: 'bar-chart-2', color: '#4f46e5' },
            ];

            // Mock Data Generator for Performance
            const PERFORMANCE_DATA = [
                { unit: 'Unidad 1', cal: 8.5, con: 9.0, asis: 95 },
                { unit: 'Unidad 2', cal: 8.8, con: 8.5, asis: 92 },
                { unit: 'Unidad 3', cal: 9.2, con: 9.5, asis: 98 },
                { unit: 'Unidad 4', cal: 9.0, con: 9.2, asis: 96 },
            ];

            return (
                <>
                    <button onClick={() => setSelectedAlumno(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, transition: 'all 0.15s' }}>← Volver a lista</button>

                    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: 24 }}>
                        {/* Header */}
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🎓</div>
                                <div>
                                    <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>{alu.nombre}</h1>
                                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>{alu.matricula} · {carrera.label} · {alu.semestre}º Semestre</p>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, background: alu.status === 'Regular' ? '#f0fdf4' : '#fef2f2', color: alu.status === 'Regular' ? '#16a34a' : '#ef4444', fontWeight: 600, fontSize: '0.75rem' }}>{alu.status}</span>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div style={{ display: 'flex', background: '#fafbfc', borderBottom: '1px solid #e2e8f0' }}>
                            {ALUMNO_TABS.map(t => (
                                <button key={t.id} onClick={() => setAlumnoTab(t.id as any)}
                                    style={{
                                        flex: 1, padding: '14px 0', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
                                        borderBottom: alumnoTab === t.id ? `3px solid ${t.color}` : '3px solid transparent',
                                        color: alumnoTab === t.id ? t.color : '#94a3b8', fontWeight: alumnoTab === t.id ? 700 : 500, fontSize: '0.85rem', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                                    }}
                                ><Icon name={t.icon} size={16} /> {t.label}</button>
                            ))}
                        </div>

                        {/* Content */}
                        <div style={{ padding: 32, background: '#f8fafc', minHeight: 400 }}>
                            {alumnoTab === 'expediente' && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
                                    {/* ID Card */}
                                    <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                                        <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#f1f5f9', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>👤</div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>{alu.nombre}</h3>
                                        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>CURP: {alu.curp}</p>
                                        <div style={{ marginTop: 20, textAlign: 'left', fontSize: '0.85rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                                <span style={{ color: '#94a3b8' }}>Carrera</span>
                                                <span style={{ fontWeight: 600, color: carrera.color }}>{carrera.label}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                                <span style={{ color: '#94a3b8' }}>Semestre</span>
                                                <span style={{ fontWeight: 600 }}>{alu.semestre}º</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                                <span style={{ color: '#94a3b8' }}>Grupo</span>
                                                <span style={{ fontWeight: 600 }}>{alu.grupo}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                                <span style={{ color: '#94a3b8' }}>Folio</span>
                                                <span style={{ fontWeight: 600, color: '#0e6ba8' }}>{alu.matricula}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                                                <span style={{ color: '#94a3b8' }}>Tipo Sangre</span>
                                                <span style={{ fontWeight: 600 }}>{alu.sangre || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Data Sheet */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                            <div style={{ background: '#1e293b', padding: '12px 20px', color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>CONTACTO Y DOMICILIO</div>
                                            <div style={{ padding: 20, fontSize: '0.85rem' }}>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                                    <div>
                                                        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700, marginBottom: 4 }}>EMAIL</label>
                                                        <div style={{ fontWeight: 500, color: '#334155' }}>{alu.email}</div>
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700, marginBottom: 4 }}>TELÉFONO</label>
                                                        <div style={{ fontWeight: 500, color: '#334155' }}>{alu.phone}</div>
                                                    </div>
                                                    <div style={{ gridColumn: 'span 2' }}>
                                                        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700, marginBottom: 4 }}>DIRECCIÓN</label>
                                                        <div style={{ fontWeight: 500, color: '#334155' }}>{alu.address}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                            <div style={{ background: '#1e293b', padding: '12px 20px', color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>INFORMACIÓN DE TUTORES</div>
                                            <div style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                                <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8 }}>
                                                    <label style={{ color: '#2563eb', fontSize: '0.7rem', fontWeight: 700 }}>TUTOR PRINCIPAL</label>
                                                    <div style={{ fontWeight: 600, color: '#0f172a', margin: '4px 0' }}>{alu.tutor?.nombre || 'N/A'}</div>
                                                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{alu.tutor?.phone}</div>
                                                </div>
                                                <div style={{ background: '#fff1f2', padding: 16, borderRadius: 8 }}>
                                                    <label style={{ color: '#e11d48', fontSize: '0.7rem', fontWeight: 700 }}>EMERGENCIA</label>
                                                    <div style={{ fontWeight: 600, color: '#0f172a', margin: '4px 0' }}>{alu.emergencia?.nombre || 'N/A'}</div>
                                                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{alu.emergencia?.phone}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {alumnoTab === 'horario' && (
                                <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                    {/* Blue Header */}
                                    <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
                                        <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>📅 Horario Semanal</h3>
                                    </div>
                                    {/* Prepare colors */}
                                    {(() => {
                                        // Update Mock Data specifically for this view to match the requested format
                                        const SCHEDULE_GRID = [
                                            { hora: '7:30 - 8:30', lu: { m: 'Contabilidad I', p: 'Lic. María F.', g: '1A' }, ma: { m: 'Auditoría', p: 'Lic. Carlos R.', g: '3A' }, mi: null, ju: { m: 'Contabilidad I', p: 'Lic. María F.', g: '1A' }, vi: { m: 'Auditoría', p: 'Lic. Carlos R.', g: '3A' } },
                                            { hora: '8:30 - 9:30', lu: { m: 'Contabilidad I', p: 'Lic. María F.', g: '1A' }, ma: { m: 'Auditoría', p: 'Lic. Carlos R.', g: '3A' }, mi: { m: 'Costos', p: 'C.P. Ana M.', g: '2A' }, ju: { m: 'Contabilidad I', p: 'Lic. María F.', g: '1A' }, vi: null },
                                            { hora: '9:30 - 10:30', lu: null, ma: null, mi: { m: 'Costos', p: 'C.P. Ana M.', g: '2A' }, ju: null, vi: null },
                                            { type: 'break', hora: '10:30 - 11:00' },
                                            { hora: '11:00 - 12:00', lu: { m: 'Costos', p: 'C.P. Ana M.', g: '2A' }, ma: null, mi: null, ju: { m: 'Costos', p: 'C.P. Ana M.', g: '2A' }, vi: { m: 'Contabilidad I', p: 'Lic. María F.', g: '1A' } },
                                            { hora: '12:00 - 13:00', lu: { m: 'Costos', p: 'C.P. Ana M.', g: '2A' }, ma: null, mi: { m: 'Auditoría', p: 'Lic. Carlos R.', g: '3A' }, ju: null, vi: { m: 'Contabilidad I', p: 'Lic. María F.', g: '1A' } },
                                            { hora: '13:00 - 14:00', lu: null, ma: { m: 'Contabilidad I', p: 'Lic. María F.', g: '1A' }, mi: { m: 'Auditoría', p: 'Lic. Carlos R.', g: '3A' }, ju: null, vi: null },
                                            { hora: '14:00 - 15:00', lu: null, ma: null, mi: null, ju: null, vi: null },
                                        ];

                                        const uniqueSubjects = new Set<string>();
                                        SCHEDULE_GRID.forEach((row: any) => {
                                            if (row.type !== 'break') {
                                                ['lu', 'ma', 'mi', 'ju', 'vi'].forEach(d => { if (row[d]) uniqueSubjects.add(row[d].m); });
                                            }
                                        });
                                        const mColors: Record<string, string> = {};
                                        const pal = ['#0e6ba8', '#c62828', '#6a1b9a', '#2e7d32', '#e65100', '#00838f', '#ad1457', '#283593'];
                                        Array.from(uniqueSubjects).forEach((s, i) => { mColors[s] = pal[i % pal.length]; });

                                        return (
                                            <>
                                                {/* Header row */}
                                                <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(5, 1fr)', borderBottom: '2px solid #e2e8f0' }}>
                                                    <div style={{ padding: '14px 16px', background: '#f8fafc', fontWeight: 700, fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Hora</div>
                                                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map(d => (
                                                        <div key={d} style={{ padding: '14px 8px', background: '#f8fafc', fontWeight: 700, fontSize: '0.8rem', color: '#0f172a', textAlign: 'center', borderLeft: '1px solid #e2e8f0' }}>{d}</div>
                                                    ))}
                                                </div>

                                                {/* Data rows */}
                                                {SCHEDULE_GRID.map((row: any, i: number) => {
                                                    const isBreak = row.type === 'break';
                                                    if (isBreak) {
                                                        return (
                                                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px repeat(5, 1fr)', borderBottom: '1px solid #f1f5f9', background: '#fffbeb' }}>
                                                                <div style={{ padding: '12px 12px', fontSize: '0.75rem', fontWeight: 700, color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #e2e8f0' }}>
                                                                    ☕ RECESO
                                                                </div>
                                                                {['lu', 'ma', 'mi', 'ju', 'vi'].map((day) => (
                                                                    <div key={day} style={{ padding: '12px 8px', borderLeft: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <span style={{ fontSize: '0.72rem', color: '#d97706', fontStyle: 'italic', fontWeight: 600 }}>10:30 - 11:00</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px repeat(5, 1fr)', borderBottom: '1px solid #f1f5f9' }}>
                                                            <div style={{ padding: '12px 12px', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #e2e8f0', flexDirection: 'column', gap: 4 }}>
                                                                <span>{row.hora.split(' - ')[0]}</span>
                                                                <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>a {row.hora.split(' - ')[1]}</span>
                                                            </div>
                                                            {['lu', 'ma', 'mi', 'ju', 'vi'].map((key) => {
                                                                const cell = row[key];
                                                                const col = cell ? (mColors[cell.m] || '#64748b') : '#64748b';
                                                                return (
                                                                    <div key={key} style={{ padding: '4px', borderLeft: '1px solid #f1f5f9', display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}>
                                                                        {cell ? (
                                                                            <div style={{ width: '100%', padding: '6px 8px', borderRadius: 6, background: `${col}12`, borderLeft: `3px solid ${col}`, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                                                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: col, margin: '0 0 2px', lineHeight: 1.2 }}>{cell.m}</p>
                                                                                <p style={{ fontSize: '0.65rem', color: '#475569', margin: 0, fontWeight: 500 }}>{cell.p}</p>
                                                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                                                                                    <span style={{ fontSize: '0.6rem', color: '#94a3b8', background: '#fff', padding: '1px 4px', borderRadius: 4, border: '1px solid #e2e8f0' }}>{cell.g}</span>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                                                                <span style={{ fontSize: '0.72rem', color: '#e2e8f0' }}>—</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    );
                                                })}
                                            </>
                                        );
                                    })()}
                                </div>
                            )}

                            {alumnoTab === 'reportes' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                    <div style={{ background: '#ea580c', padding: '16px 24px', borderRadius: 12, color: '#fff', fontSize: '1rem', fontWeight: 600 }}>REPORTES Y SEGUIMIENTO ACADÉMICO</div>
                                    {/* Stats */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                                        <div style={{ background: '#fff0f0', border: '1px solid #fecaca', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                                            <div style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>INASISTENCIAS</div>
                                            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#b91c1c' }}>{alu.reportes?.inasistencias || 0}</div>
                                        </div>
                                        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                                            <div style={{ color: '#d97706', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>RETARDOS</div>
                                            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#b45309' }}>{alu.reportes?.retardos || 0}</div>
                                        </div>
                                        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                                            <div style={{ color: '#3b82f6', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>OTROS REPORTES</div>
                                            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1d4ed8' }}>{alu.reportes?.otros || 0}</div>
                                        </div>
                                    </div>
                                    {/* Incident Log */}
                                    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: '#334155' }}>BITÁCORA DE INCIDENTES</div>
                                        {alu.reportes?.bitacora && alu.reportes.bitacora.length > 0 ? alu.reportes.bitacora.map((b: any, i: number) => (
                                            <div key={i} style={{ padding: 20, borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 20 }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 60, flexShrink: 0, gap: 4 }}>
                                                    <Icon name="calendar" size={18} />
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textAlign: 'center' }}>{b.fecha.split(' ')[0]}</div>
                                                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8', textAlign: 'center' }}>{b.fecha.split(' ')[1]}</div>
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: b.color, textTransform: 'uppercase', background: `${b.color}15`, padding: '2px 8px', borderRadius: 4 }}>{b.tipo}</span>
                                                    <div style={{ fontWeight: 600, color: '#0f172a', margin: '4px 0' }}>{b.titulo}</div>
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>Materia: {b.materia}</div>
                                            </div>
                                        )) : (
                                            <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8' }}>Sin incidentes registrados</div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {alumnoTab === 'desempeno' && (
                                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                    <div style={{ background: '#4f46e5', padding: '16px 24px', color: '#fff', fontSize: '1rem', fontWeight: 600 }}>DESEMPEÑO ACADÉMICO POR UNIDAD</div>
                                    <div style={{ padding: 32 }}>
                                        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                                            {/* We create a grouped visualization for each unit */}
                                            {PERFORMANCE_DATA.map((d: any, i: number) => (
                                                <div key={i} style={{ flex: 1, minWidth: 200, background: '#f8fafc', borderRadius: 12, padding: 16, border: '1px solid #e2e8f0' }}>
                                                    <h4 style={{ margin: '0 0 16px', color: '#1e293b', fontSize: '0.9rem', textAlign: 'center', fontWeight: 700 }}>{d.unit}</h4>
                                                    <div style={{ display: 'flex', alignItems: 'flex-end', height: 150, gap: 12, justifyContent: 'center' }}>
                                                        {/* Calificaciones */}
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                                                            <div style={{ width: 24, background: '#3b82f6', height: `${d.cal * 10}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                                                                <span style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: 700, color: '#3b82f6' }}>{d.cal}</span>
                                                            </div>
                                                            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b' }}>CAL</span>
                                                        </div>
                                                        {/* Conducta */}
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                                                            <div style={{ width: 24, background: '#10b981', height: `${d.con * 10}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                                                                <span style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: 700, color: '#10b981' }}>{d.con}</span>
                                                            </div>
                                                            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b' }}>CON</span>
                                                        </div>
                                                        {/* Asistencia */}
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                                                            <div style={{ width: 24, background: '#f59e0b', height: `${d.asis}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                                                                <span style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: 700, color: '#f59e0b' }}>{d.asis}%</span>
                                                            </div>
                                                            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b' }}>ASI</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
                                            <div style={{ background: '#1e293b', padding: 20, borderRadius: 12, color: '#fff' }}>
                                                <h5 style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>Comentario de Orientación</h5>
                                                <p style={{ fontSize: '0.8rem', opacity: 0.8, fontStyle: 'italic', lineHeight: 1.5 }}>
                                                    "El alumno mantiene un desempeño sobresaliente. Se observa una correlación positiva entre su asistencia y el incremento en su promedio reciente."
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            );
        }

        const carrera = CARRERAS.find(c => c.id === selectedCarrera)!;
        const alumnosCarrera = ALUMNOS.filter(a => a.carrera === selectedCarrera);

        return (
            <>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Alumnos</h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Listado de alumnos inscritos por carrera.</p>
                </div>

                {/* Career tabs */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                    {CARRERAS.map(c => (
                        <button key={c.id} onClick={() => setSelectedCarrera(c.id)}
                            style={{
                                padding: '10px 20px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                                fontSize: '0.82rem', fontWeight: selectedCarrera === c.id ? 700 : 500, transition: 'all 0.2s',
                                background: selectedCarrera === c.id ? c.gradient : '#fff',
                                color: selectedCarrera === c.id ? '#fff' : '#64748b',
                                boxShadow: selectedCarrera === c.id ? `0 4px 14px ${c.color}40` : '0 1px 3px rgba(0,0,0,0.04)',
                                border: selectedCarrera === c.id ? 'none' : '1px solid #e2e8f0',
                            }}
                        >{c.label}</button>
                    ))}
                </div>

                {/* Students table */}
                <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ background: carrera.gradient, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, margin: 0 }}>Alumnos de {carrera.label}</h3>
                        <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: '0.72rem', fontWeight: 600 }}>{alumnosCarrera.length} alumnos</span>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                <th style={{ textAlign: 'left', padding: '14px 24px', color: '#94a3b8', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Matrícula</th>
                                <th style={{ textAlign: 'left', padding: '14px 16px', color: '#94a3b8', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nombre</th>
                                <th style={{ textAlign: 'center', padding: '14px 16px', color: '#94a3b8', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Semestre</th>
                                <th style={{ textAlign: 'center', padding: '14px 16px', color: '#94a3b8', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Grupo</th>
                                <th style={{ textAlign: 'center', padding: '14px 16px', color: '#94a3b8', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estatus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumnosCarrera.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>No hay alumnos registrados en esta carrera</td>
                                </tr>
                            ) : alumnosCarrera.map(alu => (
                                <tr key={alu.id} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.15s', cursor: 'pointer' }}
                                    onClick={() => setSelectedAlumno(alu)}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '14px 24px', fontWeight: 600, color: '#334155' }}>{alu.matricula}</td>
                                    <td style={{ padding: '14px 16px', fontWeight: 500, color: '#0f172a' }}>{alu.nombre}</td>
                                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#64748b' }}>{alu.semestre}º</td>
                                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#64748b' }}>{alu.grupo}</td>
                                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                        <span style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: 20, background: alu.status === 'Regular' ? '#f0fdf4' : '#fef2f2', color: alu.status === 'Regular' ? '#16a34a' : '#ef4444', fontWeight: 600 }}>
                                            {alu.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    };

    /* ── Render: Instancia Modal ───────────────────── */
    const renderInstanciaModal = () => {
        if (!showNewInstancia) return null;
        const area = ADMIN_AREAS.find(a => a.id === showNewInstancia);
        if (!area) return null;

        return (
            <div onClick={() => { setShowNewInstancia(null); setNewInstancia({ titulo: '', descripcion: '', prioridad: 'Media' }); }}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, animation: 'fadeIn 0.2s ease' }}>
                <div onClick={e => e.stopPropagation()}
                    style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', overflow: 'hidden', animation: 'slideUp 0.3s ease' }}>
                    {/* Modal header */}
                    <div style={{ background: area.gradient, padding: '24px 28px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: -15, right: -15, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                            <div>
                                <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Nueva Instancia</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '4px 0 0' }}>{area.title}</p>
                            </div>
                            <button onClick={() => { setShowNewInstancia(null); setNewInstancia({ titulo: '', descripcion: '', prioridad: 'Media' }); }}
                                style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="x" size={16} />
                            </button>
                        </div>
                    </div>
                    {/* Modal body */}
                    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' }}>Título *</label>
                            <input type="text" placeholder="Ej: Solicitud de materiales"
                                value={newInstancia.titulo} onChange={e => setNewInstancia({ ...newInstancia, titulo: e.target.value })}
                                style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border 0.2s' }}
                                onFocus={e => e.currentTarget.style.borderColor = area.color}
                                onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' }}>Descripción</label>
                            <textarea placeholder="Describe la instancia con detalle..."
                                value={newInstancia.descripcion} onChange={e => setNewInstancia({ ...newInstancia, descripcion: e.target.value })}
                                rows={4} style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', transition: 'border 0.2s' }}
                                onFocus={e => e.currentTarget.style.borderColor = area.color}
                                onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: 8, display: 'block' }}>Prioridad</label>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {(['Alta', 'Media', 'Baja'] as const).map(p => {
                                    const pc = prioColor(p);
                                    const sel = newInstancia.prioridad === p;
                                    return (
                                        <button key={p} onClick={() => setNewInstancia({ ...newInstancia, prioridad: p })}
                                            style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: sel ? `2px solid ${pc.text}` : '1px solid #e2e8f0', background: sel ? pc.bg : '#fff', color: sel ? pc.text : '#94a3b8', fontSize: '0.82rem', fontWeight: sel ? 700 : 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                                            {p === 'Alta' ? '🔴' : p === 'Media' ? '🟡' : '🟢'} {p}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                            <button onClick={() => { setShowNewInstancia(null); setNewInstancia({ titulo: '', descripcion: '', prioridad: 'Media' }); }}
                                style={{ flex: 1, padding: '12px 0', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancelar</button>
                            <button onClick={() => addInstancia(showNewInstancia)}
                                style={{ flex: 1, padding: '12px 0', borderRadius: 10, border: 'none', background: area.gradient, color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 14px ${area.color}40` }}>Crear Instancia</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    /* ── Render placeholder ─────────────────────────── */
    const renderPlaceholder = (title: string) => (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🚧</div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>Módulo de {title}</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Este módulo está en desarrollo. Próximamente estará disponible.</p>
        </div>
    );

    /* ── Main render ────────────────────────────────── */
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
            {/* Animations */}
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @media print {
                    .no-print { display: none !important; }
                    aside { display: none !important; }
                    main { margin-left: 0 !important; }
                    header { display: none !important; }
                    body { background: #fff !important; }
                    .print-only { display: block !important; }
                    @page { margin: 20mm; size: A4; }
                }
            `}</style>

            {/* ═══════ SIDEBAR ═══════ */}
            <aside style={{ width: 240, background: '#fff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 10 }}>
                <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src="/img/Tecsum_Logo.webp" alt="TECSUM" style={{ height: 36 }} />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#00072d', letterSpacing: '0.03em' }}>TECSUM</div>
                            <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Digital</div>
                        </div>
                    </div>
                </div>

                <nav style={{ padding: '12px 10px', flex: 1 }}>
                    {(globalSearch ? filteredMenu : MENU_ITEMS).map(item => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveMenu(item.id); setExpandedCard(null); }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                                padding: '10px 14px', marginBottom: 2, border: 'none', borderRadius: 8,
                                background: activeMenu === item.id ? '#00072d' : 'transparent',
                                color: activeMenu === item.id ? '#fff' : '#64748b',
                                fontSize: '0.85rem', fontWeight: activeMenu === item.id ? 600 : 400,
                                cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit', textAlign: 'left',
                            }}
                            onMouseEnter={(e) => { if (activeMenu !== item.id) e.currentTarget.style.background = '#f1f5f9'; }}
                            onMouseLeave={(e) => { if (activeMenu !== item.id) e.currentTarget.style.background = 'transparent'; }}
                        >
                            <Icon name={item.icon} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div style={{ padding: '12px 10px', borderTop: '1px solid #f1f5f9' }}>
                    <button
                        onClick={handleLogout}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', border: 'none', borderRadius: 8, background: 'transparent', color: '#ef4444', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <Icon name="log-out" />
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            {/* ═══════ MAIN ═══════ */}
            <main style={{ flex: 1, marginLeft: 240 }}>
                <header style={{ height: 60, background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 5 }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>{getPageTitle()}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 12px' }}>
                            <Icon name="search" size={14} />
                            <input type="text" placeholder="Buscar..." value={globalSearch} onChange={e => setGlobalSearch(e.target.value)} style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.82rem', color: '#334155', width: 120, fontFamily: 'inherit' }} />
                        </div>
                        <div style={{ color: '#64748b', cursor: 'pointer', position: 'relative' }}>
                            <Icon name="bell" size={18} />
                            <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: '#ef4444', border: '2px solid #fff' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8, cursor: 'pointer' }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #0e6ba8, #00aeef)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>
                                {user?.username?.charAt(0).toUpperCase()}
                            </div>
                            <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#334155' }}>{user?.username}</span>
                        </div>
                    </div>
                </header>

                <div style={{ padding: '24px 28px' }}>
                    {activeMenu === 'dashboard' && renderDashboard()}
                    {activeMenu === 'administrativos' && renderAdminView()}
                    {activeMenu === 'docentes' && renderDocentesView()}
                    {activeMenu === 'alumnos' && renderAlumnosView()}
                    {activeMenu === 'reportes' && renderPlaceholder('Reportes')}
                    {activeMenu === 'configuracion' && renderPlaceholder('Configuración')}
                </div>
            </main>

            {/* ═══════ MODALS ═══════ */}
            {renderInstanciaModal()}
        </div>
    );
}
