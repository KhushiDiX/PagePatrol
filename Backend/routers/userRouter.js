const express = require('express');
const Model = require('../models/userModel'); // Importing the user model
const jwt = require('jsonwebtoken');//importing jsonwebtoken
require('dotenv').config();//importing dotenv

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
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

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal server error' });
            console.log(err);
        });
})

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal Server Error' });
            console.log(err);
        });
})

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            res.status(500).json({ message: 'Internal server error' });
            console.log(err);

        });
})
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            res.status(500).json({ message: 'Internal server error' });
            console.log(err);

        });
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                //email and password are correct
                //generate token
                const { email, password, _id } = result;
                const payload = { _id, email, password };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);

                    } else {
                        res.status(200).json({ token });
                    }
                })
            }
            else {
                //email and password are incorrect
                res.status(401).json({ message: 'Invalid Email or Password' });
            }

        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });

        });


})

router.get('/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Token is valid, return user info
        res.status(200).json({ _id: decoded._id, email: decoded.email });
    });
});

module.exports = router;
