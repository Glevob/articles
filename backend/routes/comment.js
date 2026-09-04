const express = require('express');
const router = express.Router();
const { Comment, Article } = require('../models');

// GET /article/:id/comments/
router.get('/article/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { articleId: req.params.id } });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /article/:id/comment/:commentId/
router.get('/article/:id/comment/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId, articleId: req.params.id }
    });
    if (!comment) return res.status(404).json({ message: 'Комментарий не найден' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /article/:id/comment/
router.post('/article/:id/comment', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: 'Статья не найдена' });

    const comment = await Comment.create({
      text: req.body.text,
      articleId: req.params.id
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /article/:id/comment/:commentId/
router.patch('/article/:id/comment/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId, articleId: req.params.id }
    });
    if (!comment) return res.status(404).json({ message: 'Комментарий не найден' });

    await comment.update({ text: req.body.text });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /article/:id/comment/:commentId/
router.delete('/article/:id/comment/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId, articleId: req.params.id }
    });
    if (!comment) return res.status(404).json({ message: 'Комментарий не найден' });

    await comment.destroy();
    res.json({ message: 'Комментарий удален' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;