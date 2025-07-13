// Datos de materias
const materias = [
  { id: 1, nombre: "Introducción a la Biotecnología y a los Laboratorios", cuatrimestre: 1, correlativas: [], creditos: null },
  { id: 2, nombre: "Matemática I", cuatrimestre: 1, correlativas: [], creditos: null },
  { id: 3, nombre: "Biología general", cuatrimestre: 1, correlativas: [], creditos: null },
  { id: 4, nombre: "Introducción a la química", cuatrimestre: 1, correlativas: [], creditos: null },
  { id: 5, nombre: "Química General e Inorgánica", cuatrimestre: 2, correlativas: [4], creditos: null },
  { id: 6, nombre: "Laboratorio de Análisis Ambiental", cuatrimestre: 2, correlativas: [4], creditos: null },
  { id: 7, nombre: "Matemática II", cuatrimestre: 2, correlativas: [2], creditos: null },
  { id: 8, nombre: "Higiene y Seguridad", cuatrimestre: 2, correlativas: [4], creditos: null },
  { id: 9, nombre: "Nuevos Entornos y Lenguajes: la producción del conocimiento en la era digital", cuatrimestre: 2, correlativas: [], creditos: null },
  { id: 10, nombre: "Inglés I", cuatrimestre: 2, correlativas: [], creditos: null },
  { id: 11, nombre: "Microbiología general", cuatrimestre: 3, correlativas: [3, 5, 6], creditos: 2 },
  { id: 12, nombre: "Química Orgánica", cuatrimestre: 3, correlativas: [5], creditos: null },
  { id: 13, nombre: "Física", cuatrimestre: 3, correlativas: [7], creditos: null },
  { id: 14, nombre: "Asignatura Unahur I", cuatrimestre: 4, correlativas: [], creditos: null },
  { id: 15, nombre: "Laboratorio de Química Instrumental y Analítica", cuatrimestre: 4, correlativas: [5, 7], creditos: 2 },
  { id: 16, nombre: "Gestión de la Calidad", cuatrimestre: 4, correlativas: [6, 8], creditos: null },
  { id: 17, nombre: "Bioquímica I", cuatrimestre: 4, correlativas: [12], creditos: 2 },
  { id: 18, nombre: "Laboratorio de Análisis de Alimentos, Medicamentos y Cosméticos", cuatrimestre: 5, correlativas: [11, 16], creditos: 2 },
  { id: 19, nombre: "Introducción a la Biología Celular y Molecular", cuatrimestre: 5, correlativas: [17], creditos: null },
  { id: 20, nombre: "Laboratorio de Técnicas Inmunológicas y de Diagnóstico Molecular", cuatrimestre: 5, correlativas: [17], creditos: 2 },
  { id: 21, nombre: "Laboratorio de Análisis Clínicos", cuatrimestre: 5, correlativas: [15, 16], creditos: 2 },
  { id: 22, nombre: "Laboratorio de Producción Vegetal", cuatrimestre: 5, correlativas: [11], creditos: null },
];

const CUATRI_LABELS = ["", "1er Cuatrimestre", "2do Cuatrimestre", "3er Cuatrimestre", "4to Cuatrimestre", "5to Cuatrimestre"];

let materiasAprobadas = [];

function getMateriasPorCuatrimestre(cuatrimestre) {
  return materias.filter(m => m.cuatrimestre === cuatrimestre);
}

function getMateriasDesbloqueadas() {
  const desbloqueadas = {};
  materias.forEach(m => {
    if (
      m.correlativas.length === 0 ||
      m.correlativas.every(id => materiasAprobadas.includes(id))
    ) {
      desbloqueadas[m.id] = true;
    } else {
      desbloqueadas[m.id] = false;
    }
  });
  return desbloqueadas;
}

function creditosAcumulados() {
  let c = 0;
  materias.forEach(m => {
    if (materiasAprobadas.includes(m.id) && m.creditos) c += m.creditos;
  });
  return c;
}

function render() {
  const grid = document.getElementById("materias-grid");
  grid.innerHTML = "";
  const desbloqueadas = getMateriasDesbloqueadas();

  for (let cuatri = 1; cuatri <= 5; cuatri++) {
    const col = document.createElement("div");
    col.className = "cuatrimestre-columna";
    const titulo = document.createElement("div");
    titulo.className = "cuatrimestre-titulo";
    titulo.innerText = CUATRI_LABELS[cuatri];
    col.appendChild(titulo);

    getMateriasPorCuatrimestre(cuatri).forEach(materia => {
      const aprobada = materiasAprobadas.includes(materia.id);
      const desbloqueada = desbloqueadas[materia.id];
      const bubble = document.createElement("div");
      bubble.className = "materia-bubble " +
        (cuatri >= 3 ? "virus" : "bacteria") +
        (!desbloqueada ? " locked" : "") +
        (aprobada ? " aprobada" : desbloqueada ? " desbloqueada" : "");

      bubble.title = `${materia.nombre}\nCorrelativas: ${materia.correlativas.length ? materia.correlativas.join(", ") : "-"}\nCréditos: ${materia.creditos == null ? "---" : materia.creditos}`;

      bubble.onclick = () => {
        if (!desbloqueada) return;
        if (aprobada) {
          materiasAprobadas = materiasAprobadas.filter(id => id !== materia.id);
        } else {
          materiasAprobadas.push(materia.id);
        }
        render();
      };

      const nombreDiv = document.createElement("span");
      nombreDiv.className = "nombre";
      nombreDiv.innerText = materia.nombre;
      bubble.appendChild(nombreDiv);

      const creditosDiv = document.createElement("span");
      creditosDiv.className = "creditos";
      creditosDiv.innerText = materia.creditos != null && materia.creditos !== 0
        ? `+${materia.creditos} créditos`
        : "";
      bubble.appendChild(creditosDiv);

      col.appendChild(bubble);
    });

    grid.appendChild(col);
  }

  document.getElementById("creditos-acumulados").innerText = creditosAcumulados();
}

window.onload = render;
