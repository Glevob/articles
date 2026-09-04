'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.hasMany(models.Comment, {
        foreignKey: 'articleId',
        as: 'comments',
        onDelete: 'CASCADE'
      });
    }
  }
  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};