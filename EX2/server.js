const express = require("express");
const app = express();
const PORT = 8081;

app.use(express.json());

app.post("/contar", (req, res) => {
  try {
    const {numeros} = req.body;

    if (!Array.isArray(numeros)) {
      return res.status(400).json({
        erro: "Envie os números dentro de 'numeros'."
      });
    }

    const verificarNumeros = numeros.every(n => !isNaN(Number(n)));

    if (!verificarNumeros) {
      return res.status(400).json({
        erro: "Os valores devem ser números válidos, não deve conter letras ou caracteres."
      });
    }

    let soma = 0;
    for (let i = 0; i < numeros.length; i++) {
      soma += Number(numeros[i]);
    }

    return res.status(200).json({
      mensagem: "Cálculo realizado com sucesso!",
      resultado: soma
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Ocorreu um erro no servidor."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
