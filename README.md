# TypeRace — Frontend 🎯

[![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow.svg)]
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)]

**Descripción breve**

**TypeRace** es la aplicación frontend para un juego de velocidad de escritura. Construida con **React + Vite**, está pensada para ofrecer una experiencia de juego fluida, medir rendimiento en tiempo real y presentar estadísticas visuales.

---

## 🌈 Visión en un vistazo
- Juego de tipeo con medición de WPM, precisión y errores.
- Autenticación (incluye login con Google) y gestión de sesión con access/refresh tokens.
- Panel de usuario con historial y gráficos de rendimiento.
- Panel de administración para gestionar textos que se usan en las partidas.

---

## ✨ Características principales
- Mecanismo de juego en tiempo real: `TypingInput` captura la entrada y calcula métricas al vuelo.
- `TextDisplay` muestra el texto objetivo con resaltado de palabras completadas y errores.
- Resultados y estadísticas: tarjetas de resultado (`GameResultCard`) y gráficos (Chart.js).
- Rutas protegidas por rol: `PrivateRoute` y `ProtectedRouteAdmin`.

---

## 🧩 Páginas clave
- `/login` — Autenticación (email/password y Google).
- `/play` — Interfaz de partida (PlayRandomPage).
- `/dashboard` — Estadísticas y partidas recientes.
- `/admin/texts` — Gestión de textos (CRUD) para administradores.

---

## ⚙️ Arquitectura técnica (resumen)
- Cliente HTTP centralizado en `src/services/apiClient.js` con manejo automático de tokens y refresh cuando una petición recibe 401.
- Lógica de refresh diseñada para evitar múltiples refresh simultáneos (cola única) y reintentar peticiones con el nuevo token.
- Caching y sincronización con backend mediante **React Query**.
- Estado de sesión y permisos gestionado por `AuthContext` / `AuthProvider`.

---

## 🎨 UI y experiencia
- Estilos con **Tailwind CSS** (responsive y utilitario).
- Notificaciones con **react-toastify**; iconografía con **react-icons**.
- Gráficos: **Chart.js** + **react-chartjs-2** (configurada en `src/services/chartSetup.js`).

---

## 🔐 Variables de entorno y endpoints esperados
- `VITE_BACKEND_API` — URL base del backend (ej: `https://api.midominio.com/api`).

Rutas típicas que el frontend consume:
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /texts`, `POST /texts` (admin)
- `POST /games`, `GET /games/:id`
- `GET /users/:id/stats`

---

## 🟡 Estado actual
- Funcionalidad principal implementada: juego, autenticación, estadísticas y gestión de textos.
- Pendiente: tests automáticos (unitarios/e2e), pipeline de CI y mejoras de manejo de errores y accesibilidad.

---

