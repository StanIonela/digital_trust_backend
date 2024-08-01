const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controller/usersController');
const { saveUser } = require('../middleware/auth');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /api/user/register: 
 *  post:
 *      summary: Create a new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: The user was successfully created
 *          409:
 *              description: Email already taken
 *          500:
 *              description: Internal Server Error
 */
router.post('/register', saveUser, register);

/**
 * @swagger
 * /api/user/login: 
 *  post:
 *      summary: Login a user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginUser'
 *      responses:
 *          201:
 *              description: The user was successfully logged in
 *          409:
 *              description: Authentication failed
 *          500:
 *              description: Internal Server Error
 */
router.post('/login', login);

/**
 * @swagger
 * /api/user/getProfile: 
 *  get:
 *      summary: Get user profile
 *      tags: [User]
 *      security:
 *          - BearerAuth: []
 *      responses:
 *          201:
 *              description: The user profile was successfully retrived
 *          404:
 *              description: User not found
 *          500:
 *              description: Internal Server Error
 */
router.get('/getProfile', authenticateToken, getProfile);

/**
 * @swagger
 * /api/user/updateProfile: 
 *  put:
 *      summary: Update user profile
 *      tags: [User]
 *      security:
 *          - BearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user profile was successfully updated
 *          404:
 *              description: User not found
 *          500:
 *              description: Internal Server Error
 */
router.put('/updateProfile', authenticateToken, updateProfile);

module.exports = router;