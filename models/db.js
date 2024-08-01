const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URI, {
  logging: false,
});

sequelize.authenticate().then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.error(`Unable to connect to the database. ERROR: ${err}`);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel')(sequelize, DataTypes);
db.subjects = require('./subjectModel')(sequelize, DataTypes);
db.grades = require('./gradeModel')(sequelize, DataTypes);

db.users.belongsToMany(db.subjects, { 
  through: db.grades,
  foreignKey: 'studentId',
  otherKey: 'subjectId',
  as: 'Subjects',
  onDelete: 'SET NULL'
});
db.subjects.belongsToMany(db.users, { 
  through: db.grades,
  foreignKey: 'subjectId',
  otherKey: 'studentId',
  as: 'Students',
  onDelete: 'SET NULL'
});

db.grades.belongsTo(db.users, { 
  foreignKey: 'studentId', 
  as: 'Student', 
  onDelete: 'SET NULL' 
});

db.grades.belongsTo(db.subjects, { 
  foreignKey: 'subjectId', 
  as: 'Subject' ,
  onDelete: 'SET NULL' 
});

db.users.hasMany(db.grades, { 
  foreignKey: 'studentId',
  onDelete: 'SET NULL'
});

db.subjects.hasMany(db.grades, { 
  foreignKey: 'subjectId',
  onDelete: 'SET NULL'
});

module.exports = db;
