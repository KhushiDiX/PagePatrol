const express = require('express');
const Model = require('../models/userModel'); // Importing the user model
const jwt = require('jsonwebtoken');//importing jsonwebtoken
require('dotenv').config();//importing dotenv

const router = express.Router();

// Middleware to verify token for protected routes
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
        req.user = user;
        next();
    });
};

router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
        .then((result) => {
            // Don't return the full user object with password
            const { password, ...userWithoutPassword } = result.toObject();
            res.status(200).json(userWithoutPassword);
        }).catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(400).json({ message: 'User Email already exists' });
            }
            else {
                res.status(500).json({ message: 'Internal server error' });
            }

        });
})

router.get('/getall', authenticateToken, (req, res) => {
    // Check if user is admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    Model.find({}, { password: 0 }) // Exclude password field
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal server error' });
            console.log(err);
        });
})

router.get('/getbyid/:id', authenticateToken, (req, res) => {
    // Allow users to access only their own data or admin to access any data
    if (req.user.role !== 'admin' && req.user._id !== req.params.id) {
        return res.status(403).json({ message: 'Access denied. You can only access your own data.' });
    }

    Model.findById(req.params.id, { password: 0 }) // Exclude password field
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal Server Error' });
            console.log(err);
        });
})

router.delete('/delete/:id', authenticateToken, (req, res) => {
    // Only admin can delete users or users can delete their own account
    if (req.user.role !== 'admin' && req.user._id !== req.params.id) {
        return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (!result) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ message: 'User deleted successfully' });
        }).catch((err) => {
            res.status(500).json({ message: 'Internal server error' });
            console.log(err);
        });
})

router.put('/update/:id', authenticateToken, (req, res) => {
    // Only admin can update users or users can update their own account
    if (req.user.role !== 'admin' && req.user._id !== req.params.id) {
        return res.status(403).json({ message: 'Access denied. You can only update your own account.' });
    }

    // Regular users shouldn't be able to change their role
    if (req.user.role !== 'admin' && req.body.role) {
        delete req.body.role;
    }

    Model.findByIdAndUpdate(req.params.id, req.body, { new: true, select: '-password' })
        .then((result) => {
            if (!result) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal server error' });
            console.log(err);
        });
});

router.post('/authenticate', (req, res) => {
    const { email, password } = req.body;

    // Find user by email (not by directly matching the entire request body)
    Model.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: 'Invalid Email or Password' });
            }

            // In a real application, you would use bcrypt to compare hashed passwords
            // For now, direct comparison (WARNING: NOT SECURE FOR PRODUCTION)
            if (user.password === password) {
                // Create token with only necessary information (NOT the password)
                const payload = { 
                    _id: user._id, 
                    email: user.email,
                    role: user.role 
                };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: 'Error generating token' });
                    } else {
                        res.status(200).json({ 
                            token, 
                            role: user.role,
                            user: {
                                _id: user._id,
                                name: user.name,
                                email: user.email
                            }
                        });
                    }
                });
            } else {
                res.status(401).json({ message: 'Invalid Email or Password' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

router.get('/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Token is valid, return user info (never return the password even if it's in the decoded token)
        res.status(200).json({ 
            _id: decoded._id, 
            email: decoded.email, 
            role: decoded.role 
        });
    });
});

module.exports = router;
