const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Article, Comment } = require('../models');

// GET /analytic/comments/?dateFrom=#timestamp#&dateTo=#timestamp#
router.get('/analytic/comments', async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.query;

    if (!dateFrom || !dateTo) {
      return res.status(400).json({ message: 'Параметры dateFrom и dateTo обязательны' });
    }

    const startDate = new Date(Number(dateFrom));
    const endDate = new Date(Number(dateTo));

    const articlesWithComments = await Article.findAll({
      include: [{
        model: Comment,
        as: 'comments',
        required: true,
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          }
        }
      }]
    });

    res.json(articlesWithComments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;