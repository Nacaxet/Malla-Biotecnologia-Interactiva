import React, { useState } from "react";
import { materias as materiasRaw } from "../data/materias";
import { MateriaBubble } from "./MateriaBubble";
import "../styles/materias.css";

function getMateriasPorCuatrimestre(cuatrimestre: number) {
  return materiasRaw.filter((m) => m.cuatrimestre === cuatrimestre);
}
function getMateriasDesbloqueadas(
  materiasAprobadas: number[]
): { [id: number]: boolean } {
  const desbloqueadas: { [id: number]: boolean } = {};
  for (const m of materiasRaw) {
    if (
      m.correlativas.length === 0 ||
      m.correlativas.every((id) => materiasAprobadas.includes(id))
    ) {
      desbloqueadas[m.id] = true;
    } else {
      desbloqueadas[m.id] = false;
    }
  }
  return desbloqueadas;
}

function creditosAcumulados(materiasAprobadas: number[]) {
  let c = 0;
  for (const m of materiasRaw) {
    if (materiasAprobadas.includes(m.id) && m.creditos) c += m.creditos;
  }
  return c;
}

const CUATRI_LABELS = [
  "",
  "1er Cuatrimestre",
  "2do Cuatrimestre",
  "3er Cuatrimestre",
  "4to Cuatrimestre",
  "5to Cuatrimestre",
];

export const PlanCurricular: React.FC = () => {
  const [materiasAprobadas, setMateriasAprobadas] = useState<number[]>([]);
  const desbloqueadas = getMateriasDesbloqueadas(materiasAprobadas);

  function handleToggleMateria(id: number) {
    setMateriasAprobadas((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  return (
    <div style={{ padding: 20, paddingRight: 170, background: "#f2f3f7", minHeight: "100vh" }}>
      <div className="credits-bar">
        Créditos obtenidos: {creditosAcumulados(materiasAprobadas)}
      </div>
      <h1 style={{ color: "#6b43b5", marginBottom: 32, textAlign: "center", letterSpacing: "1px" }}>
        Malla Curricular Biotecnología
      </h1>
      <div className="materias-grid">
        {[1, 2, 3, 4, 5].map((cuatri) => (
          <div className="cuatrimestre-columna" key={cuatri}>
            <div className="cuatrimestre-titulo">
              {CUATRI_LABELS[cuatri]}
            </div>
            {getMateriasPorCuatrimestre(cuatri).map((materia) => (
              <MateriaBubble
                key={materia.id}
                materia={materia}
                desbloqueada={desbloqueadas[materia.id]}
                aprobada={materiasAprobadas.includes(materia.id)}
                onClick={() =>
                  desbloqueadas[materia.id] && handleToggleMateria(materia.id)
                }
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ color: "#6b43b5", marginTop: 40, background: "#e9e3f5", padding: 18, borderRadius: 18, textAlign: "center", maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
        <b>Instrucciones:</b> Haz click en una materia para marcarla como aprobada o desaprobarla.<br/>
        Las materias grises con borde punteado están bloqueadas por correlatividad.<br/>
        Desde el 3er cuatrimestre, las materias tienen forma de virus.<br/>
        Los créditos se suman solo con materias aprobadas.<br/>
        El avance de créditos aparece en el lateral derecho.<br/>
      </div>
    </div>
  );
};
