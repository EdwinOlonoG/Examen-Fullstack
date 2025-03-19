﻿# Examen-Fullstack

URL de la aplicación:
https://chat-gemini-a5f39.web.app/

FRONTEND

Angular CLI: 19.1.1
Node: 22.13.0
Package Manager: npm 11.0.0

Comandos para levantar el proyecto:
npm install
npm start

La aplicación front cuenta con un apartado de texto precargado para interactuar con la ia de gemini, al hacer click en el botón de mensaje este se envía. A los pocos segundos se recibe una respuesta. Del lado derecho se ve un apartado con un resumen del chat en formato JSON.

Backend
Node: 22.13
Framework: express

Comando para levantar el servidor.
node index.js
Nota: El servidor está configurado para su despliegue en aws. Para levantar de forma local, reemplazar el siguiente código:

module.exports.handler = serverless(app);

//Reemplazar con:

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

La aplicación cuenta con un endpoint de tipo post '/analyze'
Este se encarga de recibir un texto dado por la entrada del usuario.
En cada iteración de mensaje se recibe el historial del chat, el cual se encadena con un prompt inicial configurando la salida requerida del modelo de ia
