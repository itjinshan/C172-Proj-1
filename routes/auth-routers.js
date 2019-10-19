const router = require('express').Router();

// auth login
router.get('/Login', (req, res) => {
    res.render('../frontend/src/Login');
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with Google
router.get('/google', (req, res) => {
    // handle with passport
    res.send('logging in with Google');
});

module.exports = router;