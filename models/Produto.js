const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('web2', 'root', 'ifpe2023', {
    dialect: 'mysql' 
});

class Produto extends Model { }

Produto.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Produto'
});
Produto.sync({ alter: true });

module.exports = Produto;
