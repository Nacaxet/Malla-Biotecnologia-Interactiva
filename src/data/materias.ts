export interface Materia {
  id: number;
  nombre: string;
  cuatrimestre: number;
  correlativas: number[];
  creditos: number | null;
}

export const materias: Materia[] = [
  // 1er Cuatrimestre
  {
    id: 1,
    nombre: "Introducción a la Biotecnología y a los Laboratorios",
    cuatrimestre: 1,
    correlativas: [],
    creditos: null,
  },
  {
    id: 2,
    nombre: "Matemática I",
    cuatrimestre: 1,
    correlativas: [],
    creditos: null,
  },
  {
    id: 3,
    nombre: "Biología general",
    cuatrimestre: 1,
    correlativas: [],
    creditos: null,
  },
  {
    id: 4,
    nombre: "Introducción a la química",
    cuatrimestre: 1,
    correlativas: [],
    creditos: null,
  },
  // 2do Cuatrimestre
  {
    id: 5,
    nombre: "Química General e Inorgánica",
    cuatrimestre: 2,
    correlativas: [4],
    creditos: null,
  },
  {
    id: 6,
    nombre: "Laboratorio de Análisis Ambiental",
    cuatrimestre: 2,
    correlativas: [4],
    creditos: null,
  },
  {
    id: 7,
    nombre: "Matemática II",
    cuatrimestre: 2,
    correlativas: [2],
    creditos: null,
  },
  {
    id: 8,
    nombre: "Higiene y Seguridad",
    cuatrimestre: 2,
    correlativas: [4],
    creditos: null,
  },
  {
    id: 9,
    nombre: "Nuevos Entornos y Lenguajes: la producción del conocimiento en la era digital",
    cuatrimestre: 2,
    correlativas: [],
    creditos: null,
  },
  {
    id: 10,
    nombre: "Inglés I",
    cuatrimestre: 2,
    correlativas: [],
    creditos: null,
  },
  // 3er Cuatrimestre
  {
    id: 11,
    nombre: "Microbiología general",
    cuatrimestre: 3,
    correlativas: [3, 5, 6],
    creditos: 2,
  },
  {
    id: 12,
    nombre: "Química Orgánica",
    cuatrimestre: 3,
    correlativas: [5],
    creditos: null,
  },
  {
    id: 13,
    nombre: "Física",
    cuatrimestre: 3,
    correlativas: [7],
    creditos: null,
  },
  // 4to Cuatrimestre
  {
    id: 14,
    nombre: "Asignatura Unahur I",
    cuatrimestre: 4,
    correlativas: [],
    creditos: null,
  },
  {
    id: 15,
    nombre: "Laboratorio de Química Instrumental y Analítica",
    cuatrimestre: 4,
    correlativas: [5, 7],
    creditos: 2,
  },
  {
    id: 16,
    nombre: "Gestión de la Calidad",
    cuatrimestre: 4,
    correlativas: [6, 8],
    creditos: null,
  },
  {
    id: 17,
    nombre: "Bioquímica I",
    cuatrimestre: 4,
    correlativas: [12],
    creditos: 2,
  },
  // 5to Cuatrimestre
  {
    id: 18,
    nombre: "Laboratorio de Análisis de Alimentos, Medicamentos y Cosméticos",
    cuatrimestre: 5,
    correlativas: [11, 16],
    creditos: 2,
  },
  {
    id: 19,
    nombre: "Introducción a la Biología Celular y Molecular",
    cuatrimestre: 5,
    correlativas: [17],
    creditos: null,
  },
  {
    id: 20,
    nombre: "Laboratorio de Técnicas Inmunológicas y de Diagnóstico Molecular",
    cuatrimestre: 5,
    correlativas: [17],
    creditos: 2,
  },
  {
    id: 21,
    nombre: "Laboratorio de Análisis Clínicos",
    cuatrimestre: 5,
    correlativas: [15, 16],
    creditos: 2,
  },
  {
    id: 22,
    nombre: "Laboratorio de Producción Vegetal",
    cuatrimestre: 5,
    correlativas: [11],
    creditos: null,
  },
];
