import express from "express"; //importa o framework express
const app = express(); //cria a const app que herda as funções do express
const port = 3000; // A porta que aplicação/API ira rodar;


//rota com resposta do tipo texto 
app.get("/", (req, res) => {

    res.send("Hello World!!!");

})
//nova rota com resposta do tipo texto
app.get("/teste", (req, res) => {
    res.send("Hello World meu fi!!!");
})

//rota com resposta do tipo JSON
app.get('/usuario', (req, res) => {
    res.json({
        nome: "João",
        idade: 25,
        cidade: "São Paulo"
    });
});

//rota get com status HTTP - status 200 (sucesso)
app.get('/status', (req, res) => {
    res.status(200).send("Tudo OK!");
});

//rota get com status HTTP - status 500 (erro interno do servidor)
app.get('/erro', (req, res) => {
    res.status(500).json({
        erro: "Erro interno do servidor"
    })
});

app.get("/usuario/:id", (req, res)=>{
    const {id} = req.params;
    res.status(200).json({
        id: id,
        nome: "User exemplo"
    })
})

app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`);
})



