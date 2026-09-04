const express = require('express');
const router = express.Router();
const { Article, Comment } = require('../models');

// GET /articles/ — Получить все статьи
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /article/:id/ — Получить статью по ID
router.get('/article/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [{ model: Comment, as: 'comments' }]
    });
    if (!article) return res.status(404).json({ message: 'Статья не найдена' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /article/ — Создать статью
router.post('/article', async (req, res) => {
  try {
    const { title, text } = req.body;
    const article = await Article.create({ title, text });
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /article/:id/ — Обновить статью
router.patch('/article/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: 'Статья не найдена' });
    await article.update(req.body);
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /article/:id/ — Удалить статью
router.delete('/article/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: 'Статья не найдена' });
    await article.destroy();
    res.json({ message: 'Статья удалена' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;