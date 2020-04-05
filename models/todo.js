'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    name: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  }, {});
  Todo.associate = function(models) {
    //定義多對一的關聯
    Todo.belongsTo(models.User)
  };
  return Todo;
};