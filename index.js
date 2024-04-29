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
    try {
        const { id } = req.params;
        const { rows } = await pool.query('SELECT * FROM bruxo WHERE id = $1', [id]);
        res.json(rows);

    } catch (error) {
        return res.status(400).json({ error: 'Bruxo não encontrado!' });
    }
}
);

// app.get('/bruxo/nome/:nome', async (req, res) => {
//     const { nome } = req.params.nome;
//     const { rows } = await pool.query('SELECT * FROM bruxo WHERE nome = $1', [nome]);
//     res.json(rows);

//     try {
//         const { nome } = req.params;
//         const { rows } = await pool.query('SELECT * FROM bruxo WHERE nome = $1', [nome]);
//         res.json(rows);
        
//     } catch (error) {
//         return res.status(400).json({ error: 'Bruxo não encontrado!' });    
        
//     }
// }
// );

app.post('/bruxo', async (req, res) => {
    const { nome, idade, casa, habilidade, sangue, patrono, varinha } = req.body;
    if (sangue !== 'Puro' && sangue !== 'Mestico' && sangue !== 'Trouxa') {
        return res.status(400).json({ error: 'Tipo de sangue inválido!' });
    }

    const casasValidas = ['grifinoria', 'sonserina', 'lufalufa', 'corvinal'];
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

//crud varinhas

app.get('/varinha', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM varinha');
        res.json(rows);

    } catch (error) {
        return res.status(400).json({ error: 'Varinha não encontrada!' });
    }
}
);

app.get('/varinha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('SELECT * FROM varinha WHERE id = $1', [id]);
        res.json(rows);

    } catch (error) {
        return res.status(400).json({ error: 'Varinha não encontrada!' });
    }
}
);

app.post('/varinha', async (req, res) => {
    try {
        const { madeira, nucleo, tamanho, fabricacao } = req.body;
        if (!madeira || !nucleo || !tamanho || !fabricacao) {
            return res.status(400).json({ error: 'Por favor, forneça todos os campos necessários.' });
        }
        await pool.query('INSERT INTO varinha (madeira, nucleo, tamanho, fabricacao) VALUES ($1, $2, $3, $4)', [madeira, nucleo, tamanho, fabricacao]);
        
        res.json({ message: 'Varinha cadastrada com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar varinha:', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao processar a requisição.' });
    }
});

app.put('/varinha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { madeira, nucleo, tamanho, fabricacao } = req.body;
        await pool.query('UPDATE varinha SET madeira = $1, nucleo = $2, tamanho = $3, fabricacao = $4 WHERE id = $5', [madeira, nucleo, tamanho, fabricacao, id]);
        res.json({ message: 'Varinha atualizada com sucesso!' });

    } catch (error) {
        return res.status(400).json({ error: 'Varinha não encontrada!' });
    }
}
);

app.delete('/varinha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM varinha WHERE id = $1', [id]);
        res.json({ message: 'Varinha deletada com sucesso!' });

    } catch (error) {
        return res.status(400).json({ error: 'Varinha não encontrada!' });
    }
}
);


//------------------------------------------------------------------------------



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);








