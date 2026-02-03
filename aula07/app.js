import express from "express";
import "dotenv/config";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/usuarios", usuarioRoutes);


app.get("/", (req, res) => {
    res.status(200).json({ msg: "Api Rodandoooooooo" });
});

app.listen(PORT, () => {
    console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
