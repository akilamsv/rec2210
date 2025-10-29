const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json());

app.post('/login', (req, res) => {
    try {
        const {nome, email, senha} = req.body;

        if (!nome || nome.trim().length < 3) {
            return res.status(400).json({message: 'Nome deve ter no mínimo 3 caracteres.'});
        }

        if (!email || !email.includes('@') || !email.includes('.')) {
            return res.status(400).json({message: 'Email inválido, tente novamente.'});
        }

        if (!senha || senha.length < 4) {
            return res.status(400).json({message: 'Senha deve ter no mínimo 4 caracteres.'});
        }

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            usuario: {nome, email, senha}
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro interno do servidor', error: error.message});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor executando em http://localhost:${PORT}`);
});
