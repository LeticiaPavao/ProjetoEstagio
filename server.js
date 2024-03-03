const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const mysql = require('mysql');

const app = express();

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Middleware to validate the contract
const validateContract = [
    check('artistName').notEmpty().withMessage('Artist name is required'),
];

// Route for submitting the contract
app.post('/submit-contract', validateContract, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Connect to the database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'leticia',
        password: '19991992',
        database: 'contract'
    });

    // Insert contract data into the database
    const formData = req.body;
    const query = `INSERT INTO contratos (artista_nome, artista_id, contratante_nome, cache, data_evento, endereco) 
                    VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [formData.artistName, formData.artistId, formData.contractorName, formData.cache, formData.eventDate, formData.address];

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return res.status(500).json({ error: 'Error connecting to the database' });
        }
        
        // Execute the SQL query
        connection.query(query, values, (err, result) => {
            connection.end();

            if (err) {
                console.error('Error inserting data into the database:', err);
                return res.status(500).json({ error: 'Error inserting data into the database' });
            }
            
            console.log('Data inserted into the database successfully');
            return res.status(200).json({ success: true });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



