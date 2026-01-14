import express from "express"; //importa o framework express
const app = express(); //cria a const app que herda as funções do express
const port = 3000; // A porta que aplicação/API ira rodar;


app.get("/",(req, res) =>{

    res.send("Hello World!!!");

})

app.get("/teste",(req, res) =>{

    res.send("Hello World meu fi!!!");

})

app.listen(port, ()=>{
    console.log(`Aplicação rodando em http://localhost:${port}`);
})



