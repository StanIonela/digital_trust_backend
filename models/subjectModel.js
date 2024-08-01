module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define('Subject', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true
    });
    
    return Subject;
};
