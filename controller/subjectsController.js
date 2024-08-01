const db = require('../models/db');

const Subject = db.subjects;
const Grade = db.grades;
const Users = db.users;

const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.findAll({
            include: [{
                model: Users,
                as: 'Students',
                through: {
                    model: Grade,
                    attributes: ['value']
                },
                attributes: ['id', 'firstName', 'lastName']
            }]
        });
        if(subjects) {
            return res.json(subjects);
        } else {
            return res.send('No subjects found');
        }
    } catch(err) {
        console.error(err);
        return res.send('Internal Server Error');
    }
}

const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);

        if(!subject) {
            return res.send('Subject not found');
        }

        return res.send(subject);
    } catch(err) {
        console.error(err);
        return res.send('Internal Server Error');
    }
}

const studentSubject = async (req, res) => {
    try {
        const studentId = req.user.id;
        const subject = await Subject.findAll({
            where: {
                '$Grades.studentId$': studentId
            },
            include: [{
                model: Grade,
                where: {
                    studentId: studentId
                },
                required: false
            }]
        })

        return res.json(subject);
    } catch(err) {
        throw new Error('Failed to fetch subjects for user: ', err);
        return res.send('Internal Server Error');
    }
}

const addSubjects = async (req, res) => {
    try {
        const { name } = req.body;
        const findSubject = await Subject.findOne({
            where: { name }
        })

        if(findSubject) {
            return res.send('Subject with this name already exist.');
        } else {
            const subject = await Subject.create({ name });

            if(subject) {
                return res.send(subject);
            } else {
                return res.send('Failed to create subject');
            }
        }
    } catch(err) {
        console.error(err);
        return res.send('Internal Server Error');
    }
}

const assignSubjectToStudent = async (req, res) => {
    try {
        const { id: studentId } = req.params;
        const { subjectId } = req.body;

        if(!studentId || !subjectId) {
            return res.send('Missing studentId or subjectId');
        }

        const student = await Users.findOne({
            where: {
                id: studentId,
                role: 'student'
            }
        });

        const subject = await Subject.findOne({
            where: {
                id: subjectId
            }
        });

        if(!student || !subject) {
            return res.send('Student or Subject not found');
        }

        const grade = await Grade.create({
            studentId, 
            subjectId
        });

        if(grade) {
            return res.send('Subject assigned to student successfully');
        } else {
            return res.send('Faield to assign subject to student.');
        }
    } catch(err) {
        console.error(err);
        return res.send('Internal Server Error');
    }
};

const updateSubjects = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const findSubject = await Subject.findOne({
            where: { name }
        })

        if(findSubject) {
            return res.send('Subject with this name already exist.');
        } else {
            const subject = await Subject.update({ name }, {
                where: { id }
              });

            if(subject[0]) {
                return res.send('Subject updated successfully');
            } else {
                return res.send('Subject not found');
            }
        }
    } catch(err) {
        console.error(err);
        return res.send('Internal Server Error');
    } 
}

const deleteSubjects = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await Subject.destroy({
            where: { id }
        });

        if(subject) {
            return res.send('Subject deleted successfully');
        } else {
            return res.send('Subject not found');
        }
    } catch(err) {
        console.error(err);
        return res.send('Internal Server Error');
    }
};

const removeSubjectFromStudent = async (req, res) => {
    try {
        const { studentId, subjectId } = req.params;

        const grade = await Grade.findOne({
            where: {
                studentId: studentId,
                subjectId: subjectId
            }
        });

        if (!grade) {
            return res.status(404).send('Grade not found or subject not assigned to student.');
        }

        await Grade.destroy({
            where: {
                studentId: studentId,
                subjectId: subjectId
            }
        });

        return res.send('Subject removed from student successfully.');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllSubjects,
    getSubjectById,
    studentSubject,
    addSubjects,
    assignSubjectToStudent,
    updateSubjects,
    deleteSubjects,
    removeSubjectFromStudent
}