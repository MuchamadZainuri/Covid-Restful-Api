const db = require("../config/database");

const { DataTypes } = require("sequelize");

const Patient = db.define('patients', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    in_date_at: {
        type: DataTypes.DATE,
    },
    out_date_at: {
        type: DataTypes.DATE,
    },
});

Patient.associate = (models) => {
    Patient.belongsTo(models.Status, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: 'id',
    })
}


module.exports = Patient;