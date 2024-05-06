const express = require('express');
const app = express();
const PORT = 3000;

const { insertar, consultar, editar, eliminar} = require("./consultas");

app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto ${PORT}`)
});

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post("/cancion", async (req, res) => {
    try {
        const datos = Object.values(req.body);
        const respuesta = await insertar(datos);
        res.json(respuesta);
    }
    catch {
        res.status(500).send("Algo salió mal")
    }
});

app.get("/canciones", async (req, res) => {
    try {
        const respuesta = await consultar ();
        res.json(respuesta);
    }
    catch {
        res.status(500).send("Algo salió mal")
    }
})

app.put("/cancion", async (req, res) => {
    try {
        const datos = Object.values(req.body);
        const respuesta = await editar(datos);
        res.json(respuesta);
    }
    catch {
        res.status(500).send("Algo salió mal")
    }
});

app.delete("/cancion?", async (req, res) => {
    try {
        const { id } = req.query;
        const respuesta = await eliminar(id);
        res.json(respuesta);
    }
    catch {
        res.status(500).send("Algo salió mal")
    }
});