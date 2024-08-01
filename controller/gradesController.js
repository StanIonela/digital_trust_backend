const db = require('../models/db');

const Subject = db.subjects;
const Student = db.users;
const Grade = db.grades;

const getAllGrades = async (req, res) => {
    try {
        const grades = await Grade.findAll({
            include: [
                {
                    model: Student,
                    as: 'Student',
                    attributes: ['firstName', 'lastName'] 
                },
                {
                    model: Subject,
                    as: 'Subject',
                    attributes: ['name']
                }
            ]
        });
        if(grades) {
            return res.json(grades);
        } else {
            return res.send('No grades found');
        }
    } catch(err) {
        console.error(err);
        return res.send('Internal Server Error');
    }
}

const getGradeById = async (req, res) => {
    try {
        const grade = await Grade.findByPk(req.params.id, {
            include: [
                {
                    model: Student,
                    as: 'Student',
                    attributes: ['firstName', 'lastName'] 
                },
                {
                    model: Subject,
                    as: 'Subject',
                    attributes: ['name']
                }
            ]
        });

        if (!grade) {
            return res.status(404).send('Grade not found');
        }

        return res.send(grade);
    } catch(err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

const addOrUpdateGrade  = async (req, res) => {
    try {
        const { value, studentId, subjectId } = req.body;
        const student = await Student.findByPk( studentId,
{            include: [{
                model: Subject,
                as: 'Subjects',
                through: {
                    model: Grade,
                    attributes: []
                }
            }],
            where:{
                role: 'student'
            }
        });

        if(!student) {
            return res.send('Student not found.');
        } 

        const existingGrade = await Grade.findOne({
            where: { 
                studentId, 
                subjectId 
            }
          });
        
          const grade = existingGrade ?
            await Grade.update({ value }, { where: { id: existingGrade.id } }) :
            await Grade.create({ value, studentId, subjectId });
            
            return res.send(grade ? 'Grade added/updated successfully.' : 'Failed to add/update grade.');
        
    } catch(err) {
        console.error(err);
        return res.send('Internal Server Error');
    }
}

const updateGrade = async (req, res) => {
    try {
        const { value } = req.body;
        const grade = await Grade.update({
            value
        }, {
            where: { 
                id: req.params.id
            }
        });

        if(grade[0] > 0) {
            return res.send('Grade updated successfully');
        } else {
            return res.send('Grade not found');
        }
    } catch(err) {
        console.error(err);
        return res.send('Internal Server Error');
    } 
}

const deleteGrade = async (req, res) => {
    try {
        const { id } = req.params;
        const grade = await Grade.findByPk(id);

        if (!grade) {
            return res.status(404).send('Grade not found');
        }

        const result = await grade.update({ value: null });

        if (result) {
            console.log(`Grade ${id} value set to null successfully.`);
            return res.send('Grade value set to null successfully.');
        } else {
            return res.send('Error setting grade value to null.');
        }
    } catch(err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllGrades,
    getGradeById,
    addOrUpdateGrade,
    updateGrade,
    deleteGrade
}
