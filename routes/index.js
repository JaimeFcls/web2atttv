const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');
const bodyParser = require('body-parser');
const { Op } = require('sequelize');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/consulta', (req, res) => {
    res.render('consulta');
});

router.post('/consulta', async (req, res) => {
    const { nome, preco } = req.body;

    try {
        const resultados = await Produto.findAll({
            where: {
                nome: {
                    [Op.like]: `%${nome}%`
                },
                preco: {
                    [Op.eq]: preco
                }
            }
        });

        res.redirect(`/resultado?resultados=${encodeURIComponent(JSON.stringify(resultados))}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao realizar a consulta');
    }
});


router.get('/resultado', (req, res) => {
    const resultados = JSON.parse(req.query.resultados);

    res.render('resultado', { resultados });
});


router.post('/inserir-produto', async (req, res) => {
    const { nome, preco } = req.body;

    try {
        const novoProduto = await Produto.create({
            nome,
            preco
        });
        res.render('inserir-produto', { message: 'Produto inserido com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao inserir produto');
    }
});
router.get('/inserir-produto', (req, res) => {
    res.render('inserir-produto');
});


module.exports = router;
