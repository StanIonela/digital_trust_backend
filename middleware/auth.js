const jwt = require('jsonwebtoken');
const db = require('../models/db');
const User = db.users;

const saveUser = async (req, res, next) => {
    try {
        const email = await User.findOne({
            where: {
                email: req.body.email,
            }
        })

        if(email) {
            return res.send('Email is already used.');
        }

        next();
    } catch (err) {
        console.error(err);
        return res.send('Internal Server Error');
    }
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.send('Access denied');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.send('Error!');
        req.user = user;
        next();
    })
};

const authorizeRole = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role) {
            return res.send(`You don't have the required role.`);
        }
        next();
    }
}

module.exports = {
    saveUser,
    authenticateToken,
    authorizeRole
}