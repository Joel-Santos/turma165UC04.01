import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req,res)=>{
    res.status(200).send("Hello World!");
});

app.listen(PORT, ()=>{
    console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
