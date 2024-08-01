const bcrypt = require('bcrypt');
const db = require('../models/db')
const jwt = require('jsonwebtoken');

const User = db.users;

const generateTokenAndSetCookie = ( user, res ) => {
    const token = jwt.sign({ 
        id: user.id,
        role: user.role
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.cookie('jwt', token, { 
        maxAge: 24 * 60 * 60 * 1000, 
        httpOnly: true
    });

    return token;
}

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role = 'student' } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        });

        if(user) {
            const token = generateTokenAndSetCookie(user, res);
            return res.send({
                user, 
                token
            });
        } else {
            return res.send('Data you introduced are incorrect.')
        }
    } catch (err) {
        console.error(err);
        return res.send('Internal Server Error');
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email }
        });

        if (user) {
            const passwordCheck = await bcrypt.compare(password, user.password);

            if (passwordCheck) {
                const token = generateTokenAndSetCookie(user, res);
                return res.send({
                    user, 
                    token
                });
            } else {
                return res.send('Authentication failed');
            }
        } else {
            return res.send('Authentication failed');
        }
    } catch (err) {
        console.error(err);
        return res.send('Internal Server Error')
    }
};

const getProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findOne({
            where: { id }
        });

        if(user) {
            return res.send(user);
        } else {
            return res.send('User not found.');
        }
    } catch (err) {
        console.error(err);
        return res.send('Internal Server Error');
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const { firstName, lastName, email, password } = req.body;
        const updateData = { firstName, lastName, email };
        
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const user = await User.update(updateData, {
            where: { id }
          });

        if(user[0]) {
            return res.send('Profile updated successfully');
        } else {
            return res.send('User not found');
        }
    } catch(err) {
        console.error(err);
        return res.send('Internal Server Error');
    } 
};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile
}