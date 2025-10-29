const express = require("express");
const app = express();
const PORT = 8081;

app.use(express.json());

const verificarNumeros = (numeros) => {
  return Array.isArray(numeros) && numeros.every(n => !isNaN(Number(n)));
};

app.post("/soma", (req, res) => {
  const {numeros} = req.body;

  if (!verificarNumeros(numeros)) {
    return res.status(400).json({
      erro: "Envie um array de números válidos."
    });
  }

  const resultado = numeros.reduce((a, b) => a + Number(b), 0);

  return res.status(200).json({
    mensagem: "Soma realizada com sucesso!",
    resultado: resultado
  });
});

app.post("/subtracao", (req, res) => {
  const {numeros} = req.body;

  if (!verificarNumeros(numeros)) {
    return res.status(400).json({
      erro: "Envie um array de números válidos."
    });
  }

  const resultado = numeros.reduce((a, b) => a - Number(b));

  return res.status(200).json({
    mensagem: "Subtração realizada com sucesso!",
    resultado: resultado
  });
});

app.post("/multiplicacao", (req, res) => {
  const {numeros} = req.body;

  if (!verificarNumeros(numeros)) {
    return res.status(400).json({
      erro: "Envie um array de números válidos."
    });
  }

  const resultado = numeros.reduce((a, b) => a * Number(b), 1);

  return res.status(200).json({
    mensagem: "Multiplicação realizada com sucesso!",
    resultado: resultado
  });
});

app.post("/divisao", (req, res) => {
  const {numeros} = req.body;

  if (!verificarNumeros(numeros)) {
    return res.status(400).json({
      erro: "Envie um array de números válidos."
    });
  }

  try {
    const resultado = numeros.reduce((a, b) => {
      if (b === 0) throw new Error('Não é possível dividir por zero.');
      return a / Number(b);
    });

    return res.status(200).json({
      mensagem: "Divisão realizada com sucesso!",
      resultado: resultado
    });
  } catch (error) {
    return res.status(400).json({
      erro: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

