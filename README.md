# TypeRace — Frontend 🎯

**TypeRace** es la interfaz frontend de un juego de velocidad de escritura construido con **React + Vite**. Esta aplicación permite a usuarios registrarse, iniciar sesión (incluyendo Google), jugar pruebas de tipeo, ver estadísticas y a administradores añadir textos para las partidas.


---

## 📋 Contenido
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Variables de entorno](#-variables-de-entorno)
- [Scripts útiles](#-scripts-útiles)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Cómo contribuir](#-cómo-contribuir)
- [Roadmap / TODOs](#-roadmap--todos)
- [Licencia](#-licencia)

---

## ✨ Características
- Jugar una partida con texto aleatorio (`PlayRandomPage`).
- Autenticación con tokens (access/refresh) y login con Google (`LoginGoogle`).
- Panel de usuario con estadísticas y resultados de partidas (`Dashboard`, `PlayerStatsCard`).
- Área de administración para insertar textos (`AdminInsertText`).
- Visualización de estadísticas con gráficos (`chartSetup.js`, `react-chartjs-2`).
- Protección de rutas para usuarios autenticados y admins (`PrivateRoute`, `ProtectedRouteAdmin`).

---

## 🛠️ Tecnologías
- React 19
- Vite
- Tailwind CSS
- Chart.js + react-chartjs-2
- React Router
- React Query
- react-hook-form + zod
- ESLint

---

## 🚀 Instalación
1. Clonar el repositorio:

```bash
git clone <repo-url>
cd typerace-frontend
```

2. Instalar dependencias:

```bash
npm install
# o
pnpm install
```

3. Crear un archivo `.env` en la raíz y añadir las variables necesarias (ver siguiente sección).

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

Abre http://localhost:5173/ (o el puerto que indique Vite).

---

## ⚙️ Variables de entorno
Crea `.env` o `.env.local` y define al menos:

```env
VITE_BACKEND_API=https://tu-backend.example.com/api
```

- `VITE_BACKEND_API`: URL base del backend (se usa en `src/config/config.js`).

Dependiendo de la integración con OAuth/Google, puede que necesites variables adicionales (client IDs) en elbackend o en la configuración de la app.

---

## 📌 Scripts útiles
- `npm run dev` — Inicia servidor de desarrollo (Vite).
- `npm run build` — Genera build de producción.
- `npm run preview` — Sirve la build localmente para probar.
- `npm run lint` — Ejecuta ESLint.

---

## 📁 Estructura principal del proyecto
(Resumen de los archivos/carpetas más relevantes)

- `src/`
  - `components/` — Componentes reutilizables (TypingInput, TextDisplay, Header…)
  - `pages/` — Vistas (Login, Dashboard, PlayRandomPage, AdminInsertText…)
  - `services/` — Cliente API y configuración de gráficos
  - `auth/` — Manejo de tokens (access/refresh)
  - `context/`, `provider/` — Contexto y providers para auth
  - `config/` — Configuración (p. ej. `VITE_BACKEND_API`)

---

## 🤝 Cómo contribuir
1. Abre un issue describiendo el bug o la mejora.
2. Crea una rama con un nombre claro: `feature/mi-mejora` o `fix/bug-descripcion`.
3. Haz un fork, implementa y abre un PR.
4. Escribe tests cuando corresponda y asegúrate de que el lint pase.

Sugerencias rápidas: sigue las convenciones de código y usa commits pequeños y descriptivos.

---

## 🛣️ Roadmap / TODOs
- [ ] Añadir tests unitarios e2e
- [ ] Mejorar manejo de errores y mensajes de UI
- [ ] Añadir CI (lint, tests, build)
- [ ] Soporte para partidas en tiempo real (multijugador)
- [ ] Despliegue automático (Vercel/Netlify) y documentación de release

> Si quieres tomar alguna de estas tareas, comenta en un issue para coordinar.

---

## ⚠️ Known Issues
- Algunas rutas y estados aún necesitan manejo de errores más robusto.
- Falta validación y tests en flujos de admin.

---

## 📬 Contacto
Si encuentras problemas o quieres colaborar, abre un issue o contacta al mantenedor del repo.

---

## 📜 Licencia
Este proyecto está bajo la licencia **MIT** (añadir archivo `LICENSE` si aplica).

---

¡Gracias por contribuir y por usar TypeRace! 😄
