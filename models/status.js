const db = require("../config/database");

const { DataTypes } = require("sequelize");

const Status = db.define('statuses', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

Status.associate = (models) => {
    Status.hasMany(models.Patient, {
        foreignKey: {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            name: 'status_id'
        }
    })
}

module.exports = Status;