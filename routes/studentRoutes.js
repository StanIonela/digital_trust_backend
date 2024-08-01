const express = require('express');
const { getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent } = require('../controller/studentsController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /api/student:
 *  get:
 *      summary: Get all students
 *      tags: [Student]
 *      security:
 *       - BearerAuth: []
 *      responses:
 *          200:
 *              description: The list of students was successfully retrieved
 *          500:
 *              description: Internal Server Error
 */
router.get('/', authenticateToken, authorizeRole('professor'), getAllStudents);

/**
 * @swagger
 * /api/student/getStudentById/{id}:
 *  get:
 *      summary: Get student by ID
 *      tags: [Student]
 *      security:
 *       - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: The student ID
 *      responses:
 *          200:
 *              description: Student information was successfully retrieved
 *          404:
 *              description: Student not found
 *          500:
 *              description: Internal Server Error
 */
router.get('/getStudentById/:id', authenticateToken, authorizeRole('professor'), getStudentById);

/**
 * @swagger
 * /api/student/addStudent:
 *  post:
 *      summary: Add a new student
 *      tags: [Student]
 *      security:
 *          - BearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: The student was successfully added
 *          409:
 *              description: Email already taken
 *          500:
 *              description: Internal Server Error
 */
router.post('/addStudent', authenticateToken, authorizeRole('professor'), addStudent);

/**
 * @swagger
 * /api/student/updateStudent/{id}:
 *  put:
 *      summary: Update a student
 *      tags: [Student]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                  type: integer
 *            required: true
 *            description: The student ID
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The student was successfully updated
 *          404:
 *              description: Student not found
 *          500:
 *              description: Internal Server Error
 */
router.put('/updateStudent/:id', authenticateToken, authorizeRole('professor'), updateStudent);


/**
 * @swagger
 * /api/student/deleteStudent/{id}:
 *  delete:
 *      summary: Delete student
 *      tags: [Student]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                  type: integer
 *            required: true
 *            description: The student ID
 *      responses:
 *          200:
 *              description: The student information was successfully deleted
 *          404:
 *              description: Student not found
 *          500:
 *              description: Internal Server Error
 */
router.delete('/deleteStudent/:id', authenticateToken, authorizeRole('professor'), deleteStudent);

module.exports = router;