/* ═══════════════════════════════════════════════════════
   SHARED MOCK DATA - TECSUM Digital
   ═══════════════════════════════════════════════════════ */

/* ── Schedule Constants ──────────────────────────────── */
export const DAYS = ['L', 'M', 'Mi', 'J', 'V'] as const;

export const DAY_LABELS: Record<string, string> = {
    L: 'Lunes',
    M: 'Martes',
    Mi: 'Miércoles',
    J: 'Jueves',
    V: 'Viernes'
};

export const TIME_SLOTS = [
    { hora: '7:30 - 8:30', idx: 0 },
    { hora: '8:30 - 9:30', idx: 1 },
    { hora: '9:30 - 10:30', idx: 2 },
    { hora: 'RECESO', idx: -1 },
    { hora: '11:00 - 12:00', idx: 3 },
    { hora: '12:00 - 13:00', idx: 4 },
    { hora: '13:00 - 14:00', idx: 5 },
    { hora: '14:00 - 15:00', idx: 6 },
];

/* ── Carreras ────────────────────────────────────────── */
export const CARRERAS = [
    { id: 'contabilidad', label: 'Contabilidad', color: '#0e6ba8', gradient: 'linear-gradient(135deg, #0e6ba8, #1e88e5)' },
    { id: 'diseno', label: 'Diseño', color: '#c62828', gradient: 'linear-gradient(135deg, #c62828, #e53935)' },
    { id: 'belleza', label: 'Belleza', color: '#6a1b9a', gradient: 'linear-gradient(135deg, #6a1b9a, #8e24aa)' },
    { id: 'programacion', label: 'Programación', color: '#2e7d32', gradient: 'linear-gradient(135deg, #2e7d32, #43a047)' },
];

/* ── Types ───────────────────────────────────────────── */
export type HorarioDia = {
    materia: string;
    grupo: string;
    slots: number[];
};

export type Docente = {
    id: number;
    nombre: string;
    email: string;
    tel: string;
    carrera: string;
    especialidad: string;
    materias: { nombre: string; grupo: string }[];
    horario: Record<string, HorarioDia[]>; // keyed by day L/M/Mi/J/V
};

/* ── Docentes ────────────────────────────────────────── */
export const DOCENTES: Docente[] = [
    {
        id: 1, nombre: 'Lic. María Fernández', email: 'maria.f@tecsum.edu.mx', tel: '55-1111-0001', carrera: 'contabilidad', especialidad: 'Contabilidad Fiscal',
        materias: [{ nombre: 'Contabilidad I', grupo: '1A' }, { nombre: 'Costos', grupo: '2A' }, { nombre: 'Auditoría', grupo: '3A' }],
        horario: {
            L: [{ materia: 'Contabilidad I', grupo: '1A', slots: [0, 1] }, { materia: 'Costos', grupo: '2A', slots: [3, 4] }],
            M: [{ materia: 'Auditoría', grupo: '3A', slots: [0, 1] }, { materia: 'Contabilidad I', grupo: '1A', slots: [5] }],
            Mi: [{ materia: 'Costos', grupo: '2A', slots: [1, 2] }, { materia: 'Auditoría', grupo: '3A', slots: [4, 5] }],
            J: [{ materia: 'Contabilidad I', grupo: '1A', slots: [0, 1] }, { materia: 'Costos', grupo: '2A', slots: [3] }],
            V: [{ materia: 'Auditoría', grupo: '3A', slots: [0] }, { materia: 'Contabilidad I', grupo: '1A', slots: [3, 4] }],
        },
    },
    {
        id: 2, nombre: 'C.P. Jorge Ramírez', email: 'jorge.r@tecsum.edu.mx', tel: '55-1111-0002', carrera: 'contabilidad', especialidad: 'Finanzas',
        materias: [{ nombre: 'Finanzas I', grupo: '1B' }, { nombre: 'Fiscal II', grupo: '2B' }, { nombre: 'Presupuestos', grupo: '3B' }],
        horario: {
            L: [{ materia: 'Finanzas I', grupo: '1B', slots: [1, 2] }, { materia: 'Presupuestos', grupo: '3B', slots: [5, 6] }],
            M: [{ materia: 'Fiscal II', grupo: '2B', slots: [0, 1] }, { materia: 'Finanzas I', grupo: '1B', slots: [4] }],
            Mi: [{ materia: 'Presupuestos', grupo: '3B', slots: [0, 1] }, { materia: 'Fiscal II', grupo: '2B', slots: [3, 4] }],
            J: [{ materia: 'Finanzas I', grupo: '1B', slots: [2] }, { materia: 'Presupuestos', grupo: '3B', slots: [5, 6] }],
            V: [{ materia: 'Fiscal II', grupo: '2B', slots: [1, 2] }, { materia: 'Finanzas I', grupo: '1B', slots: [4, 5] }],
        },
    },
    {
        id: 3, nombre: 'Lic. Rosa Mendoza', email: 'rosa.m@tecsum.edu.mx', tel: '55-1111-0003', carrera: 'contabilidad', especialidad: 'Administración',
        materias: [{ nombre: 'Administración', grupo: '1A' }, { nombre: 'Nóminas', grupo: '2A' }],
        horario: {
            L: [{ materia: 'Administración', grupo: '1A', slots: [0, 1] }],
            M: [{ materia: 'Nóminas', grupo: '2A', slots: [3, 4] }],
            Mi: [{ materia: 'Administración', grupo: '1A', slots: [1, 2] }, { materia: 'Nóminas', grupo: '2A', slots: [5] }],
            J: [{ materia: 'Administración', grupo: '1A', slots: [0] }, { materia: 'Nóminas', grupo: '2A', slots: [4, 5] }],
            V: [{ materia: 'Administración', grupo: '1A', slots: [0, 1] }],
        },
    },
    {
        id: 4, nombre: 'Lic. Andrea Solís', email: 'andrea.s@tecsum.edu.mx', tel: '55-2222-0001', carrera: 'diseno', especialidad: 'Diseño Gráfico',
        materias: [{ nombre: 'Diseño Digital', grupo: '1A' }, { nombre: 'Branding', grupo: '2A' }],
        horario: {
            L: [{ materia: 'Diseño Digital', grupo: '1A', slots: [0, 1] }, { materia: 'Branding', grupo: '2A', slots: [3, 4] }],
            M: [{ materia: 'Diseño Digital', grupo: '1A', slots: [1, 2] }],
            Mi: [{ materia: 'Branding', grupo: '2A', slots: [0, 1] }, { materia: 'Diseño Digital', grupo: '1A', slots: [5, 6] }],
            J: [{ materia: 'Diseño Digital', grupo: '1A', slots: [3, 4] }],
            V: [{ materia: 'Branding', grupo: '2A', slots: [0, 1] }, { materia: 'Diseño Digital', grupo: '1A', slots: [4] }],
        },
    },
    {
        id: 5, nombre: 'Mtro. Pavel López', email: 'pavel.l@tecsum.edu.mx', tel: '55-2222-0002', carrera: 'diseno', especialidad: 'Diseño Editorial',
        materias: [{ nombre: 'Tipografía', grupo: '1B' }, { nombre: 'Ilustración', grupo: '2B' }, { nombre: 'Portafolio', grupo: '3A' }],
        horario: {
            L: [{ materia: 'Tipografía', grupo: '1B', slots: [0, 1] }, { materia: 'Portafolio', grupo: '3A', slots: [5, 6] }],
            M: [{ materia: 'Ilustración', grupo: '2B', slots: [0, 1] }, { materia: 'Tipografía', grupo: '1B', slots: [3] }],
            Mi: [{ materia: 'Portafolio', grupo: '3A', slots: [1, 2] }, { materia: 'Ilustración', grupo: '2B', slots: [4, 5] }],
            J: [{ materia: 'Tipografía', grupo: '1B', slots: [0] }, { materia: 'Portafolio', grupo: '3A', slots: [3, 4] }],
            V: [{ materia: 'Ilustración', grupo: '2B', slots: [0, 1] }, { materia: 'Tipografía', grupo: '1B', slots: [5] }],
        },
    },
    {
        id: 6, nombre: 'Lic. Daniela Cruz', email: 'daniela.c@tecsum.edu.mx', tel: '55-2222-0003', carrera: 'diseno', especialidad: 'UX/UI',
        materias: [{ nombre: 'UX Research', grupo: '1A' }, { nombre: 'Prototipado', grupo: '2A' }],
        horario: {
            L: [{ materia: 'UX Research', grupo: '1A', slots: [3, 4] }],
            M: [{ materia: 'Prototipado', grupo: '2A', slots: [0, 1] }, { materia: 'UX Research', grupo: '1A', slots: [5, 6] }],
            Mi: [{ materia: 'UX Research', grupo: '1A', slots: [0] }, { materia: 'Prototipado', grupo: '2A', slots: [3, 4] }],
            J: [{ materia: 'UX Research', grupo: '1A', slots: [1, 2] }, { materia: 'Prototipado', grupo: '2A', slots: [5, 6] }],
            V: [{ materia: 'Prototipado', grupo: '2A', slots: [0, 1] }],
        },
    },
    {
        id: 7, nombre: 'Mtra. Lucía Herrera', email: 'lucia.h@tecsum.edu.mx', tel: '55-3333-0001', carrera: 'belleza', especialidad: 'Cosmetología',
        materias: [{ nombre: 'Cosmetología I', grupo: '1A' }, { nombre: 'Maquillaje', grupo: '2A' }],
        horario: {
            L: [{ materia: 'Cosmetología I', grupo: '1A', slots: [0, 1, 2] }, { materia: 'Maquillaje', grupo: '2A', slots: [4, 5] }],
            M: [{ materia: 'Maquillaje', grupo: '2A', slots: [0, 1] }],
            Mi: [{ materia: 'Cosmetología I', grupo: '1A', slots: [0, 1] }, { materia: 'Maquillaje', grupo: '2A', slots: [3] }],
            J: [{ materia: 'Cosmetología I', grupo: '1A', slots: [3, 4, 5] }],
            V: [{ materia: 'Maquillaje', grupo: '2A', slots: [0, 1] }, { materia: 'Cosmetología I', grupo: '1A', slots: [4] }],
        },
    },
    {
        id: 8, nombre: 'Lic. Carmen Ríos', email: 'carmen.r@tecsum.edu.mx', tel: '55-3333-0002', carrera: 'belleza', especialidad: 'Estilismo',
        materias: [{ nombre: 'Estilismo', grupo: '1B' }, { nombre: 'Colorimetría', grupo: '2B' }, { nombre: 'Tendencias', grupo: '3A' }],
        horario: {
            L: [{ materia: 'Estilismo', grupo: '1B', slots: [1, 2] }, { materia: 'Tendencias', grupo: '3A', slots: [5, 6] }],
            M: [{ materia: 'Colorimetría', grupo: '2B', slots: [0, 1] }, { materia: 'Estilismo', grupo: '1B', slots: [3, 4] }],
            Mi: [{ materia: 'Tendencias', grupo: '3A', slots: [0] }, { materia: 'Colorimetría', grupo: '2B', slots: [4, 5] }],
            J: [{ materia: 'Estilismo', grupo: '1B', slots: [0, 1] }, { materia: 'Tendencias', grupo: '3A', slots: [4] }],
            V: [{ materia: 'Colorimetría', grupo: '2B', slots: [1, 2] }, { materia: 'Estilismo', grupo: '1B', slots: [5, 6] }],
        },
    },
    {
        id: 9, nombre: 'Mtra. Valeria Ortiz', email: 'valeria.o@tecsum.edu.mx', tel: '55-3333-0003', carrera: 'belleza', especialidad: 'Dermoestética',
        materias: [{ nombre: 'Dermoestética', grupo: '1A' }, { nombre: 'Spa y Bienestar', grupo: '2A' }],
        horario: {
            L: [{ materia: 'Dermoestética', grupo: '1A', slots: [3, 4] }, { materia: 'Spa y Bienestar', grupo: '2A', slots: [5, 6] }],
            M: [{ materia: 'Spa y Bienestar', grupo: '2A', slots: [0, 1] }],
            Mi: [{ materia: 'Dermoestética', grupo: '1A', slots: [0, 1, 2] }],
            J: [{ materia: 'Spa y Bienestar', grupo: '2A', slots: [3, 4] }, { materia: 'Dermoestética', grupo: '1A', slots: [6] }],
            V: [{ materia: 'Dermoestética', grupo: '1A', slots: [0, 1] }, { materia: 'Spa y Bienestar', grupo: '2A', slots: [3] }],
        },
    },
    {
        id: 10, nombre: 'Ing. Roberto Castillo', email: 'roberto.c@tecsum.edu.mx', tel: '55-4444-0001', carrera: 'programacion', especialidad: 'Desarrollo Web',
        materias: [{ nombre: 'HTML/CSS', grupo: '1A' }, { nombre: 'JavaScript', grupo: '2A' }, { nombre: 'React', grupo: '3A' }],
        horario: {
            L: [{ materia: 'HTML/CSS', grupo: '1A', slots: [0, 1] }, { materia: 'React', grupo: '3A', slots: [5, 6] }],
            M: [{ materia: 'JavaScript', grupo: '2A', slots: [0, 1] }, { materia: 'HTML/CSS', grupo: '1A', slots: [3, 4] }],
            Mi: [{ materia: 'React', grupo: '3A', slots: [1, 2] }, { materia: 'JavaScript', grupo: '2A', slots: [4, 5] }],
            J: [{ materia: 'HTML/CSS', grupo: '1A', slots: [0] }, { materia: 'React', grupo: '3A', slots: [3, 4] }],
            V: [{ materia: 'JavaScript', grupo: '2A', slots: [0, 1] }, { materia: 'React', grupo: '3A', slots: [5] }],
        },
    },
    {
        id: 11, nombre: 'Ing. Sofía Navarro', email: 'sofia.n@tecsum.edu.mx', tel: '55-4444-0002', carrera: 'programacion', especialidad: 'Backend',
        materias: [{ nombre: 'Python', grupo: '1B' }, { nombre: 'Bases de Datos', grupo: '2B' }, { nombre: 'APIs REST', grupo: '3B' }],
        horario: {
            L: [{ materia: 'Python', grupo: '1B', slots: [0, 1] }, { materia: 'APIs REST', grupo: '3B', slots: [4, 5] }],
            M: [{ materia: 'Bases de Datos', grupo: '2B', slots: [1, 2] }, { materia: 'Python', grupo: '1B', slots: [5, 6] }],
            Mi: [{ materia: 'APIs REST', grupo: '3B', slots: [0, 1] }, { materia: 'Bases de Datos', grupo: '2B', slots: [3] }],
            J: [{ materia: 'Python', grupo: '1B', slots: [1, 2] }, { materia: 'APIs REST', grupo: '3B', slots: [5, 6] }],
            V: [{ materia: 'Bases de Datos', grupo: '2B', slots: [0, 1] }, { materia: 'Python', grupo: '1B', slots: [3, 4] }],
        },
    },
    {
        id: 12, nombre: 'Mtro. Diego Vargas', email: 'diego.v@tecsum.edu.mx', tel: '55-4444-0003', carrera: 'programacion', especialidad: 'Móvil',
        materias: [{ nombre: 'Kotlin', grupo: '1A' }, { nombre: 'Flutter', grupo: '2A' }],
        horario: {
            L: [{ materia: 'Kotlin', grupo: '1A', slots: [0, 1, 2] }, { materia: 'Flutter', grupo: '2A', slots: [5] }],
            M: [{ materia: 'Flutter', grupo: '2A', slots: [3, 4] }],
            Mi: [{ materia: 'Kotlin', grupo: '1A', slots: [0, 1] }, { materia: 'Flutter', grupo: '2A', slots: [4, 5] }],
            J: [{ materia: 'Kotlin', grupo: '1A', slots: [0, 1] }],
            V: [{ materia: 'Flutter', grupo: '2A', slots: [0, 1] }, { materia: 'Kotlin', grupo: '1A', slots: [3, 4] }],
        },
    },
];

/* ── Alumnos ─────────────────────────────────────────── */
export const ALUMNOS = [
    {
        id: 1, matricula: '2023001', nombre: 'Ana García Pérez', semestre: 6, grupo: 'A', carrera: 'contabilidad', status: 'Regular',
        curp: 'GAPA010101HDFRMN01', email: 'ana.garcia@tecsum.edu.mx', phone: '55-1234-5678', address: 'Calle de los Programadores #123, Col. Centro, C.P. 54000',
        tutor: { nombre: 'María Elena Gomez Ruiz', phone: '55-9876-5432' },
        emergencia: { nombre: 'Roberto Demetrio Lara', phone: '55-1122-3344' },
        sangre: 'A Positivo', promedio: 9.2, conducta: 9.8, asistencia: 96,
        reportes: {
            inasistencias: 2, retardos: 1, otros: 2, bitacora: [
                { fecha: '28/FEB 2024', tipo: 'Conducta / Mérito', titulo: 'Primer lugar concurso Hacking Ético', materia: 'Programación', color: '#3b82f6' },
                { fecha: '24/ENE 2024', tipo: 'Retardo', titulo: 'Retardo al ingreso por transporte', materia: 'Cálculo', color: '#eab308' },
                { fecha: '20/ENE 2024', tipo: 'Inasistencia', titulo: 'Ausencia injustificada módulo 1 y 2', materia: 'Física I', color: '#ef4444' }
            ]
        },
        horario: [
            { hora: '07:00 - 08:40', lunes: 'Lógica de Programación / Cálculo Diferencial' },
            { hora: '08:40 - 10:20', lunes: 'Física I / Desarrollo Web (Front-end)' },
            { hora: '10:40 - 12:20', lunes: 'Base de Datos / Química General' }
        ],
        chartData: [
            { month: 'Ene', cal: 8.5, con: 9.8, asis: 9.5 },
            { month: 'Feb', cal: 8.8, con: 9.6, asis: 9.2 },
            { month: 'Mar', cal: 9.2, con: 9.8, asis: 9.7 },
            { month: 'Abr', cal: 9.1, con: 9.8, asis: 9.6 },
            { month: 'May', cal: 9.4, con: 9.8, asis: 9.8 }
        ]
    },
    { id: 2, matricula: '2023002', nombre: 'Carlos López López', semestre: 6, grupo: 'A', carrera: 'contabilidad', status: 'Regular', curp: 'LOLO010101HDFRMN02', email: 'carlos.lopez@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Juan López', phone: '55-0000-0000' }, emergencia: { nombre: 'Ana López', phone: '55-0000-0000' }, sangre: 'O Positivo', promedio: 8.5, conducta: 9.0, asistencia: 90, reportes: { inasistencias: 0, retardos: 0, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 3, matricula: '2023003', nombre: 'Eduardo Martínez', semestre: 4, grupo: 'B', carrera: 'contabilidad', status: 'Irregular', curp: 'MARE010101HDFRMN03', email: 'eduardo.martinez@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Pedro Martínez', phone: '55-0000-0000' }, emergencia: { nombre: 'Luisa Martínez', phone: '55-0000-0000' }, sangre: 'A Negativo', promedio: 7.5, conducta: 8.0, asistencia: 80, reportes: { inasistencias: 5, retardos: 3, otros: 1, bitacora: [] }, horario: [], chartData: [] },
    { id: 4, matricula: '2023004', nombre: 'Gabriela Silva', semestre: 2, grupo: 'A', carrera: 'contabilidad', status: 'Regular', curp: 'SIGA010101HDFRMN04', email: 'gabriela.silva@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'José Silva', phone: '55-0000-0000' }, emergencia: { nombre: 'María Silva', phone: '55-0000-0000' }, sangre: 'B Positivo', promedio: 9.0, conducta: 9.5, asistencia: 95, reportes: { inasistencias: 0, retardos: 0, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 5, matricula: '2023005', nombre: 'Héctor Ramírez', semestre: 8, grupo: 'A', carrera: 'contabilidad', status: 'Regular', curp: 'RAHE010101HDFRMN05', email: 'hector.ramirez@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Miguel Ramírez', phone: '55-0000-0000' }, emergencia: { nombre: 'Sofía Ramírez', phone: '55-0000-0000' }, sangre: 'AB Positivo', promedio: 8.8, conducta: 9.2, asistencia: 92, reportes: { inasistencias: 1, retardos: 0, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 6, matricula: '2023010', nombre: 'Isabel Torres', semestre: 5, grupo: 'A', carrera: 'diseno', status: 'Regular', curp: 'TOIS010101HDFRMN06', email: 'isabel.torres@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Fernando Torres', phone: '55-0000-0000' }, emergencia: { nombre: 'Lucía Torres', phone: '55-0000-0000' }, sangre: 'O Negativo', promedio: 9.5, conducta: 9.8, asistencia: 98, reportes: { inasistencias: 0, retardos: 0, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 7, matricula: '2023011', nombre: 'Jorge Ruiz', semestre: 3, grupo: 'B', carrera: 'diseno', status: 'Regular', curp: 'RUJO010101HDFRMN07', email: 'jorge.ruiz@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Ricardo Ruiz', phone: '55-0000-0000' }, emergencia: { nombre: 'Marta Ruiz', phone: '55-0000-0000' }, sangre: 'A Positivo', promedio: 8.2, conducta: 8.5, asistencia: 85, reportes: { inasistencias: 2, retardos: 1, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 8, matricula: '2023012', nombre: 'Karla Vaughn', semestre: 7, grupo: 'A', carrera: 'diseno', status: 'Irregular', curp: 'VAKA010101HDFRMN08', email: 'karla.vaughn@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Steve Vaughn', phone: '55-0000-0000' }, emergencia: { nombre: 'Nancy Vaughn', phone: '55-0000-0000' }, sangre: 'B Negativo', promedio: 7.8, conducta: 8.2, asistencia: 82, reportes: { inasistencias: 4, retardos: 2, otros: 1, bitacora: [] }, horario: [], chartData: [] },
    { id: 9, matricula: '2023013', nombre: 'Luis Medina', semestre: 1, grupo: 'A', carrera: 'diseno', status: 'Regular', curp: 'MELU010101HDFRMN09', email: 'luis.medina@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Carlos Medina', phone: '55-0000-0000' }, emergencia: { nombre: 'Elena Medina', phone: '55-0000-0000' }, sangre: 'AB Negativo', promedio: 9.1, conducta: 9.4, asistencia: 94, reportes: { inasistencias: 0, retardos: 0, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 10, matricula: '2023014', nombre: 'Mónica Castro', semestre: 5, grupo: 'B', carrera: 'diseno', status: 'Regular', curp: 'CAMO010101HDFRMN10', email: 'monica.castro@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Javier Castro', phone: '55-0000-0000' }, emergencia: { nombre: 'Patricia Castro', phone: '55-0000-0000' }, sangre: 'O Positivo', promedio: 8.9, conducta: 9.3, asistencia: 93, reportes: { inasistencias: 1, retardos: 0, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 11, matricula: '2023020', nombre: 'Natalia Flores', semestre: 4, grupo: 'A', carrera: 'belleza', status: 'Regular', curp: 'FLNA010101HDFRMN11', email: 'natalia.flores@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Andrés Flores', phone: '55-0000-0000' }, emergencia: { nombre: 'Carmen Flores', phone: '55-0000-0000' }, sangre: 'A Positivo', promedio: 9.3, conducta: 9.6, asistencia: 96, reportes: { inasistencias: 0, retardos: 0, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 12, matricula: '2023021', nombre: 'Oscar Núñez', semestre: 2, grupo: 'A', carrera: 'belleza', status: 'Regular', curp: 'NUOS010101HDFRMN12', email: 'oscar.nunez@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Roberto Núñez', phone: '55-0000-0000' }, emergencia: { nombre: 'Isabel Núñez', phone: '55-0000-0000' }, sangre: 'B Positivo', promedio: 8.6, conducta: 9.0, asistencia: 90, reportes: { inasistencias: 2, retardos: 0, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 13, matricula: '2023022', nombre: 'Patricia Gil', semestre: 6, grupo: 'A', carrera: 'belleza', status: 'Irregular', curp: 'GIPA010101HDFRMN13', email: 'patricia.gil@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Manuel Gil', phone: '55-0000-0000' }, emergencia: { nombre: 'Rosa Gil', phone: '55-0000-0000' }, sangre: 'AB Positivo', promedio: 7.9, conducta: 8.3, asistencia: 83, reportes: { inasistencias: 3, retardos: 2, otros: 1, bitacora: [] }, horario: [], chartData: [] },
    { id: 14, matricula: '2023023', nombre: 'Quetzalli Méndez', semestre: 4, grupo: 'A', carrera: 'belleza', status: 'Regular', curp: 'MEQU010101HDFRMN14', email: 'quetzalli.mendez@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Héctor Méndez', phone: '55-0000-0000' }, emergencia: { nombre: 'Laura Méndez', phone: '55-0000-0000' }, sangre: 'O Negativo', promedio: 9.6, conducta: 9.9, asistencia: 99, reportes: { inasistencias: 0, retardos: 0, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 15, matricula: '2023030', nombre: 'Roberto Vega', semestre: 9, grupo: 'A', carrera: 'programacion', status: 'Regular', curp: 'VERO010101HDFRMN15', email: 'roberto.vega@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Francisco Vega', phone: '55-0000-0000' }, emergencia: { nombre: 'Ana Vega', phone: '55-0000-0000' }, sangre: 'A Positivo', promedio: 9.4, conducta: 9.7, asistencia: 97, reportes: { inasistencias: 0, retardos: 0, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 16, matricula: '2023031', nombre: 'Sandra Jiménez', semestre: 7, grupo: 'B', carrera: 'programacion', status: 'Regular', curp: 'JISA010101HDFRMN16', email: 'sandra.jimenez@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Miguel Jiménez', phone: '55-0000-0000' }, emergencia: { nombre: 'Teresa Jiménez', phone: '55-0000-0000' }, sangre: 'B Positivo', promedio: 9.0, conducta: 9.4, asistencia: 94, reportes: { inasistencias: 1, retardos: 1, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 17, matricula: '2023032', nombre: 'Tomás Ortíz', semestre: 5, grupo: 'A', carrera: 'programacion', status: 'Irregular', curp: 'ORTO010101HDFRMN17', email: 'tomas.ortiz@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Jorge Ortíz', phone: '55-0000-0000' }, emergencia: { nombre: 'Claudia Ortíz', phone: '55-0000-0000' }, sangre: 'AB Positivo', promedio: 7.6, conducta: 8.0, asistencia: 80, reportes: { inasistencias: 6, retardos: 4, otros: 2, bitacora: [] }, horario: [], chartData: [] },
    { id: 18, matricula: '2023033', nombre: 'Ursula Blanco', semestre: 3, grupo: 'A', carrera: 'programacion', status: 'Regular', curp: 'BLUR010101HDFRMN18', email: 'ursula.blanco@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Daniel Blanco', phone: '55-0000-0000' }, emergencia: { nombre: 'Beatriz Blanco', phone: '55-0000-0000' }, sangre: 'O Positivo', promedio: 8.8, conducta: 9.2, asistencia: 92, reportes: { inasistencias: 1, retardos: 0, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 19, matricula: '2023034', nombre: 'Víctor Castillo', semestre: 1, grupo: 'B', carrera: 'programacion', status: 'Regular', curp: 'CAVI010101HDFRMN19', email: 'victor.castillo@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Raúl Castillo', phone: '55-0000-0000' }, emergencia: { nombre: 'Silvia Castillo', phone: '55-0000-0000' }, sangre: 'A Negativo', promedio: 9.2, conducta: 9.5, asistencia: 95, reportes: { inasistencias: 0, retardos: 0, otros: 0, bitacora: [] }, horario: [], chartData: [] },
    { id: 20, matricula: '2023035', nombre: 'Wendy Ibarra', semestre: 7, grupo: 'A', carrera: 'programacion', status: 'Regular', curp: 'IBWE010101HDFRMN20', email: 'wendy.ibarra@tecsum.edu.mx', phone: '55-0000-0000', address: 'Av. Siempre Viva 123', tutor: { nombre: 'Gabriel Ibarra', phone: '55-0000-0000' }, emergencia: { nombre: 'Mónica Ibarra', phone: '55-0000-0000' }, sangre: 'B Positivo', promedio: 8.7, conducta: 9.1, asistencia: 91, reportes: { inasistencias: 2, retardos: 1, otros: 0, bitacora: [] }, horario: [], chartData: [] },
];
