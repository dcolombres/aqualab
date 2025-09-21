const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'aqualab-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'carga' && password === 'imagenes') {
        req.session.authenticated = true;
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
    if (req.session.authenticated) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Save files to the uploads directory
    },
    filename: function (req, file, cb) {
        // Use the filename from the request body
        cb(null, req.body.filename);
    }
});

const upload = multer({ storage: storage });

// Serve static files from the root directory
app.use(express.static(__dirname));

// Handle image uploads
app.post('/upload', isAuthenticated, upload.single('image'), (req, res) => {
    res.send('Image uploaded successfully');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
