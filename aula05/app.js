import express from "express";
import "dotenv/config";
import cursoRoutes from "./src/routes/curso/cursoRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/cursos", cursoRoutes);

app.get("/", (req,res) =>{
    res.status(200).send("Hello World!");
});

app.listen(PORT, ()=>{
    console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
