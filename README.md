# 🎬 Film App API - Node.js + Express + MongoDB

API REST construida con **Node.js**, **Express**, **MongoDB** y **TypeScript**, siguiendo buenas prácticas como arquitectura modular, patrón Repository, validaciones con Zod, documentación con Swagger y autenticación con JWT.

---

## 📦 Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- TypeScript
- JWT (jsonwebtoken) → Autenticación
- bcrypt → Encriptación de contraseñas
- Zod → Validación de datos
- Swagger (OpenAPI) → Documentación de API
- Mongoose → ODM para MongoDB
- CORS

---

## 📁 Estructura del proyecto

```bash
src/
│
├── modules/
│   ├── auth/             # Registro e inicio de sesión
│   ├── users/            # Gestión de usuarios
│   ├── films/            # Gestión de películas y series
│   ├── actors/           # Gestión de actores
│   ├── directors/        # Gestión de directores
│   ├── genres/           # Gestión de géneros
│   └── lists/            # Listas personalizadas
│
├── api/
│   └── v1/
├── config/
├── middlewares/
├── shared/
└── server.ts
```

---

## ⚙️ Instalación

```bash
git clone https://github.com/LESS-star-21/FilmApp.git
cd FilmApp
npm install
```

---

## 🏃‍♂️ Ejecución

```bash
npm run dev
```

---

## 🔐 Autenticación



Usa JWT:



```

Authorization: Bearer <token>

```



---



## 📚 Swagger



```

https://filmapp-ecz6.onrender.com/api

```



---



## 📊 Scripts



```bash

npm run dist

npm start

```



---



## 👩‍💻 Autora



Lesly Alejandra Gómez Rodríguez