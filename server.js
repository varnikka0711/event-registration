const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DATA_FILE = 'registrations.json';

app.use(bodyParser.json());
app.use(express.static('.')); // serve HTML/CSS/JS

// Ensure JSON file exists
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

// Registration endpoint
app.post('/register', (req, res) => {
    const { fname, lname, email } = req.body;
    if (!fname || !lname || !email) {
        return res.json({ success: false });
    }

    const registrations = JSON.parse(fs.readFileSync(DATA_FILE));
    registrations.push({ fname, lname, email, timestamp: new Date() });
    fs.writeFileSync(DATA_FILE, JSON.stringify(registrations, null, 2));

    console.log("New registration:", { fname, lname, email });
    res.json({ success: true });
});

// Bonus: view registrations
app.get('/registrations', (req, res) => {
    const registrations = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(registrations);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
