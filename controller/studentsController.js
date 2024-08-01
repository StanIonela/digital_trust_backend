const db = require('../models/db');
const bcrypt = require('bcrypt')

const User = db.users;
const Subject = db.subjects;
const Grade = db.grades;

const getAllStudents = async (req, res) => {
    try {
        const students = await User.findAll({
            where: { 
                role: "student" 
            },
            include: [{
                model: Subject,
                as: 'Subjects',
                through: {
                    model: Grade,
                    attributes: []
                },
                attributes: ['id', 'name']  
            }]
        });
        res.json(students);
    } catch(err) {
        console.error('Error fetching students with subjects:', err);
        res.status(500).send('Internal Server Error');
    }
};


const getStudentById = async (req, res) => {
    try {
        const student = await User.findOne({
            where: {
                id: req.params.id,
                role: 'student'
            },
            include: [
                {
                    model: Subject,
                    as: 'Subjects',
                    through: {
                        model: Grade,
                        attributes: []
                    },
                }
            ],
        });

        if(!student) {
            return res.send('Student not found');
        }

        return res.send(student);
    } catch(err) {
        console.error(err);
        return res.send('Internal Server Error');
    }
}

const addStudent = async (req, res) => {
    req.body.role = 'student';
    const { register } = require('./usersController');
    return register(req, res);
}

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, password } = req.body;

        const updateData = { firstName, lastName, email };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const student = await User.update(updateData, {
            where: { id }
          });

        if(student[0]) {
            return res.send('Profile updated successfully');
        } else {
            return res.send('Student not found');
        }
    } catch(err) {
        console.error(err);
        return res.send('Internal Server Error');
    } 
}

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await User.destroy({
            where: {
                id: id
            }
        });

        if (result) {
            return res.send('Student deleted successfully');
        } else {
            return res.send('Student not found');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
}