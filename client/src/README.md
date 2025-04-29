# Clone Insta – Proyecto Fullstack

Este proyecto es un clon simple de Instagram y algunas adaptaciones para hacer "twits" desarrollado con:

- **Frontend (client):** Vue.js
- **Backend (server):** Node.js + Express

## Estructura del proyecto
# / ├── client/ # Frontend en Vue.js 
#  └── server/ # Backend en Node.js (Express)

---

## Requisitos previos

Asegurate de tener instalado:

- [Node.js](https://nodejs.org/) (versión recomendada: 18.x o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [Vue CLI](https://cli.vuejs.org/) si vas a usar herramientas globales de Vue
- (Opcional) [Docker](https://www.docker.com/) si querés contenedores

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <URL-del-repositorio>
cd <nombre-del-proyecto>
```
### 2. Ejecutar el Backend (server)
cd server
```bash
npm install
npm run dev
```
El servidor debería correr en http://localhost:3000 (o el puerto configurado).

### 23. Ejecutar el Frontend (client)
En otra terminal:
cd client
```bash
npm install
npm run serve
```
La aplicación Vue debería abrirse en http://localhost:8080.
## Variables de entorno
Asegurate de configurar tus variables de entorno en el backend (.env dentro de la carpeta server).
PORT=3000
MONGO_URI=mongodb://localhost:27017/insta-clone
JWT_SECRET=tu_clave_secreta
## Scripts útiles
En server:
```bash
npm run dev: Ejecuta el servidor con recarga automática (usando nodemon)

npm start: Ejecuta el servidor en modo producción
```
En client:
```bash
npm run serve: Ejecuta la app Vue en modo desarrollo

npm run build: Genera la versión optimizada para producción
```


