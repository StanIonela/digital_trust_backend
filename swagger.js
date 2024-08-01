const { format } = require('sequelize/lib/utils');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Student Catalog API',
            version: '1.0.0',
            description: 'API for managing students, subjects and grades'
        },
        servers: [
            {
                url: 'http://localhost:3000',
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormst: 'JWT'
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email', 'password'],
                    properties: {
                        firstName: {
                            type: 'string'
                        },
                        lastName: {
                            type: 'string'
                        },
                        email: {
                            type: 'string',
                            format: 'email'
                        },
                        password: {
                            type: 'string',
                            format: 'password'
                        },
                        role: {
                            type: 'string',
                            enum: ['professor', 'student']
                        },
                    },
                    example: {
                        firstName: 'Jhon',
                        lastName: 'Doe',
                        email: 'jhon.doe@example.com',
                        password: 'secret123',
                        role: 'student'
                    },
                },
                LoginUser: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email'
                        },
                        password: {
                            type: 'string',
                            format: 'password'
                        },
                    },
                    example: {
                        email:'jhon.doe@example.com',
                        password: 'secret123'
                    },
                },
                Subject: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: {
                            type: 'string'
                        },
                    },
                    example: {
                        name: 'Informatics',
                    },
                },
                AssignSubject: {
                    type: 'object',
                    required: ['subjectId'],
                    properties: {
                        subjectId: {
                            type: 'integer'
                        },
                    },
                    example: {
                        subjectId: '1',
                    },
                },
                Grade: {
                    type: 'object',
                    required: ['studentId', 'subjectId'],
                    properties: {
                        value: {
                            type: 'integer'
                        },
                        studentId: {
                            type: 'integer'
                        },
                        subjectId: {
                            type: 'integer'
                        },
                    },
                    example: {
                        value: 9,
                        studentId: 1,
                        subjectId: 1
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec
}
