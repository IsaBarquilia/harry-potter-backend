const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'harry_potter_backend',
    password: 'ds564',
    port: 7007,
});

app.get('/bruxo', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM bruxo');
    res.json(rows);
}
);

app.get('/bruxo/:id', async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM bruxo WHERE id = $1', [id]);
    res.json(rows);
}
);

app.post('/bruxo', async (req, res) => {
    const { nome, idade, casa, habilidade, sangue, patrono, varinha } = req.body;
    if (sangue !== 'Puro' && sangue !== 'Mestico' && sangue !== 'Trouxa') {
        return res.status(400).json({ error: 'Tipo de sangue inválido!' });
    }

    const casasValidas = ['Grifinoria', 'Sonserina', 'LufaLufa', 'Corvinal'];
    if (!casasValidas.includes(casa.toLowerCase())) {
        return res.status(400).json({ error: 'Casa inválida!' });
    }

    await pool.query('INSERT INTO bruxo (nome, idade, casa, habilidade, sangue, patrono, varinha) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nome, idade, casa, habilidade, sangue, patrono, varinha]);
    res.json({ message: 'Bruxo cadastrado com sucesso!' });
});


app.put('/bruxo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, idade, casa } = req.body;
        await pool.query('UPDATE bruxo SET nome = $1, idade = $2, casa = $3 WHERE id = $4', [nome, idade, casa, id]);
        res.json({ message: 'Bruxo atualizado com sucesso!' });
        
    } catch (error) {
        return res.status(400).json({ error: 'Bruxo não encontrado!' });
    }
}
);

app.delete('/bruxo/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM bruxo WHERE id = $1', [id]);
    res.json({ message: 'Bruxo deletado com sucesso!' });
}
);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);




