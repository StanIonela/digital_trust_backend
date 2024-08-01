const express = require('express');
const { getAllGrades, getGradeById, addOrUpdateGrade , updateGrade, deleteGrade } = require('../controller/gradesController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /api/grade:
 *  get:
 *      summary: Get all grades
 *      tags: [Grade]
 *      security:
 *       - BearerAuth: []
 *      responses:
 *          200:
 *              description: The list of grades was successfully retrieved
 *          500:
 *              description: Internal Server Error
 */
router.get('/', authenticateToken, authorizeRole('professor'), getAllGrades);

/**
 * @swagger
 * /api/grade/getById/{id}:
 *  get:
 *      summary: Get a specific grade by student and subject ID
 *      tags: [Grade]
 *      security:
 *       - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Grade ID
 *      responses:
 *          200:
 *              description: Grade information was successfully retrieved
 *          404:
 *              description: Grade not found
 *          500:
 *              description: Internal Server Error
 */
router.get('/getById/:id', authenticateToken, authorizeRole('professor'), getGradeById);

/**
* @swagger
 * /api/grade/addOrUpdateGrade:
 *  post:
 *      summary: Add a new grade
 *      tags: [Grade]
 *      security:
 *          - BearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Grade'
 *      responses:
 *          201:
 *              description: The grade was successfully added
 *          400:
 *              description: Failed to create grade
 *          500:
 *              description: Internal Server Error
 */
router.post('/addOrUpdateGrade', authenticateToken, authorizeRole('professor'), addOrUpdateGrade);

/**
 * @swagger
 * /api/grade/updateGrade/{id}:
 *  put:
 *      summary: Update a specific grade by ID
 *      tags: [Grade]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Grade ID
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          value:
 *                              type: integer
 *                              description: Grade value
 *      responses:
 *          200:
 *              description: The grade was successfully updated
 *          404:
 *              description: Grade not found
 *          500:
 *              description: Internal Server Error
 */
router.put('/updateGrade/:id', authenticateToken, authorizeRole('professor'), updateGrade);

/**
 * @swagger
 * /api/grade/deleteGrade/{id}:
 *  delete:
 *      summary: Delete a specific grade by ID
 *      tags: [Grade]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Grade ID
 *      responses:
 *          200:
 *              description: The grade was successfully deleted
 *          404:
 *              description: Grade not found
 *          500:
 *              description: Internal Server Error
 */
router.delete('/deleteGrade/:id', authenticateToken, authorizeRole('professor'), deleteGrade);

module.exports = router;