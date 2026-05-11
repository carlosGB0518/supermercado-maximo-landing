// src/utilidades/contentsquare.js

const csDisponible = () =>
  typeof window !== 'undefined' && typeof window._uxa !== 'undefined'

export const csEvento = (nombre, datos = {}) => {
  if (!csDisponible()) return
  window._uxa.push(['trackDynamicVariable', {
    key:   nombre,
    value: JSON.stringify(datos),
  }])
}

export const csConversion = () => {
  if (!csDisponible()) return
  window._uxa.push(['trackGoal', 'registro_completado'])
}

export const csIdentificarUsuario = (datos) => {
  if (!csDisponible()) return
  if (datos.correo) {
    window._uxa.push(['setEmail', datos.correo])
  }
}

export const csDispararEncuesta = (idEncuesta) => {
  if (!csDisponible()) return
  window._uxa.push(['survey', idEncuesta])
}