const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/users', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }

        const jsonData = JSON.parse(data);
        res.json(jsonData.users);
    });
});

// Serve comments data
app.get('/comments', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }

        const jsonData = JSON.parse(data);
        res.json(jsonData.comments || []);
    });
});

// Post a new comment
app.post('/comments', (req, res) => {
    const { user, comment } = req.body;
    const newComment = { user, comment, timestamp: new Date().toISOString() };

    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }
        const jsonData = JSON.parse(data);
        jsonData.comments = jsonData.comments || [];
        jsonData.comments.push(newComment);

        fs.writeFile('db.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Internal Server Error');
            }
            console.log('Comment stored successfully.');
            res.status(201).send('Comment posted successfully');
        });
    });
});


// Serve other files
app.get('*', (req, res) => {
    res.sendFile(__dirname + req.url);
});

const port = 4202;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const PORT = process.env.PORT || 4202;
app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

