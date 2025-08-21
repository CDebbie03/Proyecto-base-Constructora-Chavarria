# Sistema de Inventario – Constructora Chavarría

**Semana 1: Mockups + Configuración de repositorio y espacio de trabajo**

Este repositorio contiene:
- Estructura base del proyecto (frontend Angular y backend Node.js).
- Guías de colaboración (Convenciones, Git y Kanban).
- Mockups de la interfaz (PDF en `mockups/`).
- Bitácora/espacio de trabajo para 6 semanas en `docs/bitacora-semanal.md`.

## Tech stack (planeado)
- **Frontend:** Angular, HTML, CSS, TypeScript
- **Backend:** Node.js (Express) con persistencia inicial en archivos JSON (simula LocalStorage del servidor)
- **Gestión:** GitHub + Kanban (Pendiente → En proceso → En revisión → Hecho)

## Cómo empezar (local)
1) Requisitos: Node 18+ y npm.
2) Clonar el repo y crear ramas:
```bash
git clone <URL-del-repo>
cd constructora-chavarria
git checkout -b chore/bootstrap
```
3) Frontend (Angular):
```bash
cd frontend
# si no tienes Angular CLI:
# npm i -g @angular/cli
ng new app --directory . --routing --style=scss
npm i
npm start
```
4) Backend (Express):
```bash
cd ../backend
npm i
npm run dev
```
5) Abrir mockups en `mockups/Mockups-Semana1.pdf` para guiar el desarrollo.

## Flujo de trabajo Git (consejo)
- Rama principal: `main`
- Ramas por tipo (ConvCommits): `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`
- Pull Requests con checklist y revisión de 1 compañero.

## Estructura
```
/frontend        # App Angular (crear con Angular CLI)
  /src
/backend         # API Express (archivos JSON como almacenamiento)
  /src
  /storage
/docs            # Bitácora, arquitectura, Kanban
/mockups         # Mockups PDF
```

## Semana 1 – Entregables
- ✅ Mockups de UI (PDF).
- ✅ Repositorio inicial con guías, plantillas y estructura.
- ✅ Bitácora creada (espacio de trabajo para 6 semanas).

> Nota: Este repo es la base de trabajo y documentación viva del equipo.
