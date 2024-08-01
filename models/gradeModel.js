module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      primaryKey: true,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'subjects',
        key: 'id',
      },
      primaryKey: true,
    },
  }, {
    timestamps: true,
  });

  Grade.associate = (models) => {
    Grade.belongsTo(models.User, { foreignKey: 'studentId', as: 'student' });
    Grade.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });
  };

  return Grade;
};
