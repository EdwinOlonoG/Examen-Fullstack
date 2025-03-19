const { GoogleGenerativeAI } = require("@google/generative-ai");
const serverless = require("serverless-http");
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAAHpT7bU0PLxJag2-tjoED7QjfAz9kA-Y';

app.use(express.json());
app.use(cors());


const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



app.post('/analyze', async (req, res) => {
    try {
        const fecha = new Date().toISOString();
        const { text } = req.body;
        console.log(text);
        if (!text) {
            return res.status(400).json({ error: 'El texto es requerido' });
        }

        const prompt = `
        Eres un asistente que debe analizar un texto de un usuario y devolver un JSON (evita usar la palabra JSON, solo coloca la estructura sin comillas) con las siguientes variables:

        "date": La fecha del suceso en formato yyyy-mm-dd.
        "location": El lugar donde ocurrió el suceso (puede ser una dirección o "domicilio titular").
        "description": Una breve descripción de lo sucedido en una sola oración, utilizando las palabras del usuario sin reinterpretar el significado.
        "injuries": Indicar si hay heridos (true o false), solo si el usuario lo menciona explícitamente.
        "owner": Indicar si el usuario es el titular del objeto protagonista del hecho (true o false), solo si esto se menciona directamente.
        "complete": Indicar si toda la información necesaria ha sido proporcionada (true o false).
        "question": Si "complete" es false, incluir una pregunta clara y específica para obtener la información faltante. Si "complete" es true, "question" será un string vacío.
        Reglas de interpretación:

        Si algún dato no es mencionado por el usuario, no intentes deducirlo ni asumirlo. Simplemente deja el campo en blanco o solicita la información en "question".
        Usa la información de fecha de este prompt solo como referencia, pero no la utilices para rellenar automáticamente el campo "date". La fecha de hoy es: ${fecha}
        Si el usuario menciona términos relativos al tiempo como "anoche", "Hoy", "ayer" o "anteayer", realiza el cálculo correspondiente basado en la fecha actual y conviértelo al formato yyyy-mm-dd.
        Siempre coloca comillas en los nombres de las propiedades del JSON.
        Historial del chat: "${text}"
        `;

        /* const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                "contents": [{
                    "parts": [{ "text": prompt }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ); */
        const result = await model.generateContent(prompt);

        /* const iaResponse = response.data.candidates[0].content.parts[0];
        console.log(iaResponse); */

        res.json(result.response.text());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error procesando la solicitud' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
