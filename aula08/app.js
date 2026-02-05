import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/usuarios", usuarioRoutes);


app.get("/", (req, res) => {
    res.status(200).json({ msg: "Api Rodandoooooooo" });
});

app.listen(PORT, () => {
    console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
