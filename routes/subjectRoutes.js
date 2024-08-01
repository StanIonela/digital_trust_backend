const express = require('express');
const { getAllSubjects, getSubjectById, studentSubject, addSubjects, assignSubjectToStudent, updateSubjects, deleteSubjects, removeSubjectFromStudent } = require('../controller/subjectsController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /api/subject:
 *  get:
 *      summary: Get all subjects
 *      tags: [Subject]
 *      security:
 *       - BearerAuth: []
 *      responses:
 *          200:
 *              description: The list of subjects was successfully retrieved
 *          500:
 *              description: Internal Server Error
 */
router.get('/', authenticateToken, authorizeRole('professor'), getAllSubjects);

/**
 * @swagger
 * /api/subject/studentSubject:
 *  get:
 *      summary: Get subjects of a student
 *      tags: [Subject]
 *      security:
 *       - BearerAuth: []
 *      responses:
 *          200:
 *              description: The list of subjects was successfully retrieved
 *          500:
 *              description: Internal Server Error
 */
router.get('/studentSubject', authenticateToken, studentSubject);

/**
 * @swagger
 * /api/subject/getSubjectById/{id}:
 *  get:
 *      summary: Get subject by ID
 *      tags: [Subject]
 *      security:
 *       - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                  type: integer
 *            required: true
 *            description: The subject ID
 *      responses:
 *          200:
 *              description: Subject information was successfully retrieved
 *          500:
 *              description: Internal Server Error
 */
router.get('/getSubjectById/:id', authenticateToken, authorizeRole('professor'), getSubjectById);

/**
 * @swagger
 * /api/subject/addSubjects:
 *  post:
 *      summary: Add a new subject
 *      tags: [Subject]
 *      security:
 *          - BearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Subject'
 *      responses:
 *          201:
 *              description: The subject was successfully added
 *          400:
 *              description: Failed to create subject
 *          500:
 *              description: Internal Server Error
 */
router.post('/addSubjects', authenticateToken, authorizeRole('professor'), addSubjects);


/**
 * @swagger
 * /api/subject/assignSubject/{id}:
 *  post:
 *      summary: Assign a subject to a student
 *      tags: [Subject]
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
 *                      $ref: '#/components/schemas/AssignSubject'
 *      responses:
 *          200:
 *              description: The subject was successfully assigned to the student
 *          404:
 *              description: Subject not found
 *          500:
 *              description: Internal Server Error
 */
router.post('/assignSubject/:id', authenticateToken, authorizeRole('professor'), assignSubjectToStudent);

/**
 * @swagger
 * /api/subject/updateSubjects/{id}:
 *  put:
 *      summary: Update a subject
 *      tags: [Subject]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                  type: integer
 *            required: true
 *            description: The subject ID
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Subject'
 *      responses:
 *          200:
 *              description: The subject was successfully updated
 *          404:
 *              description: Subject not found
 *          500:
 *              description: Internal Server Error
 */
router.put('/updateSubjects/:id', authenticateToken, authorizeRole('professor'), updateSubjects);

/**
 * @swagger
 * /api/subject/deleteSubjects/{id}:
 *  delete:
 *      summary: Delete subject
 *      tags: [Subject]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                  type: integer
 *            required: true
 *            description: The subject ID
 *      responses:
 *          200:
 *              description: The subject information was successfully deleted
 *          404:
 *              description: Subject not found
 *          500:
 *              description: Internal Server Error
 */
router.delete('/deleteSubjects/:id', authenticateToken, authorizeRole('professor'), deleteSubjects);

/**
 * @swagger
 * /api/subject/removeSubjectFromStudent/{studentId}/{subjectId}:
 *  delete:
 *      summary: Remove a subject from a student
 *      tags: [Subject]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: studentId
 *            schema:
 *              type: integer
 *            required: true
 *            description: Student ID
 *          - in: path
 *            name: subjectId
 *            schema:
 *              type: integer
 *            required: true
 *            description: Subject ID
 *      responses:
 *          200:
 *              description: Subject removed from student successfully
 *          404:
 *              description: Subject not found or not assigned to student
 *          500:
 *              description: Internal Server Error
 */
router.delete('/removeSubjectFromStudent/:studentId/:subjectId', authenticateToken, authorizeRole('professor'), removeSubjectFromStudent);

module.exports = router;