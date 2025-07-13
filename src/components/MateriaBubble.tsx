import React from "react";
import { Materia } from "../data/materias";

interface MateriaBubbleProps {
  materia: Materia;
  desbloqueada: boolean;
  aprobada: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

const pastelGreen = "#b0ebbe";
const pastelVioletIntense = "#9a7ae1";
const greyed = "#e0e0e0";
const borderGreyed = "#969696";

function getBackgroundColor(aprobada: boolean, desbloqueada: boolean) {
  if (aprobada) return pastelGreen;
  if (desbloqueada) return pastelVioletIntense;
  return greyed;
}

function getBorder(aprobada: boolean, desbloqueada: boolean) {
  if (!desbloqueada) return `3px dashed ${borderGreyed}`;
  if (aprobada) return "3px solid #3d9b6d";
  return "3px solid #7c5ed6";
}

function getShapeClass(cuatrimestre: number) {
  return cuatrimestre >= 3 ? "virus" : "bacteria";
}

export const MateriaBubble: React.FC<MateriaBubbleProps> = ({
  materia,
  desbloqueada,
  aprobada,
  onClick,
  style = {},
}) => {
  const shape = getShapeClass(materia.cuatrimestre);
  const background = getBackgroundColor(aprobada, desbloqueada);
  const border = getBorder(aprobada, desbloqueada);

  return (
    <div
      className={`materia-bubble ${shape} ${!desbloqueada ? "locked" : ""} ${aprobada ? "aprobada" : ""}`}
      onClick={onClick}
      style={{
        background,
        border,
        opacity: desbloqueada ? 1 : 0.7,
        cursor: desbloqueada ? "pointer" : "not-allowed",
        ...style,
      }}
      title={
        `${materia.nombre}\nCorrelativas: ${materia.correlativas.length ? materia.correlativas.join(", ") : "-"}\nCréditos: ${materia.creditos == null ? "---" : materia.creditos}`
      }
    >
      <span className="nombre">{materia.nombre}</span>
      <span className="creditos">
        {materia.creditos != null && materia.creditos !== 0
          ? `+${materia.creditos} créditos`
          : ""}
      </span>
    </div>
  );
};
