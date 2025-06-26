const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.use(express.json());

let clientes = [];

app.get("/", (req, res) => {
    res.send("Hello world!!!!");
});

app.get("/cliente", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM cliente");
        res.json(rows);
    } catch (error) {
        console.log("Erro ao buscar clientes:", error.message);
        res.status(500).send("Erro ao buscar clientes");
    }
});

app.get("/cliente/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await db.query("SELECT * FROM cliente WHERE id = ?", [id]);

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send(`Cliente com id: ${id} não encontrado`);
        }
    } catch (error) {
        console.log("Erro ao buscar cliente:", error.message);
        res.status(500).send("Erro ao buscar cliente");
    }
});

app.post("/cliente", (req, res) => {
    let cliente = req.body;
    cliente.id = clientes.length + 1;
    clientes.push(cliente);
    res.status(201).send("Cliente cadastrado com sucesso!");
});

app.put("/cliente/:id", (req, res) => {
    const id = req.params.id;
    const clienteAtualizado = req.body;

    let clienteIndex = clientes.findIndex(cliente => cliente.id == id);
    if (clienteIndex !== -1) {
        clientes[clienteIndex] = { id: parseInt(id), ...clienteAtualizado };
        res.send(`Cliente com id ${id} atualizado com sucesso!`);
    } else {
        res.status(404).send("Cliente não encontrado");
    }
});

app.delete("/cliente/:id", (req, res) => {
    const id = req.params.id;
    const clienteIndex = clientes.findIndex(cliente => cliente.id == id);

    if (clienteIndex !== -1) {
        clientes.splice(clienteIndex, 1);
        res.send(`Cliente com id ${id} deletado com sucesso!`);
    } else {
        res.status(404).send("Cliente não encontrado");
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
