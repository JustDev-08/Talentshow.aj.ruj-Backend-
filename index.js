const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies from requests
app.use(cors())
app.use(express.json());

// --- The Data Store ---
// Now initialized with a Boolean for 'title'.
let apiData = {
    script_number: 0,       // Integer
    title: false            // Boolean (Updated to be true or false)
};

// -----------------------------------
// Route 1: GET /api/data (Fetch Data)
// -----------------------------------
app.get('/api/data', (req, res) => {
    console.log('GET request received. Sending current data.');
    res.json(apiData);
});

// -----------------------------------
// Route 2: PUT /api/data (Replace Data)
// -----------------------------------
app.post('/api/data', (req, res) => {
    const { script_number, title } = req.body;
    
    // --- Input Validation ---
    let isValid = true;
    let errors = {};

    // 1. Check if script_number is present and is an integer
    if (script_number === undefined) {
        isValid = false;
        errors.script_number = 'script_number is required.';
    } else if (typeof script_number !== 'number' || !Number.isInteger(script_number)) {
        isValid = false;
        errors.script_number = 'script_number must be an integer.';
    }

    // 2. Check if title is present and is a boolean
    if (title === undefined) {
        isValid = false;
        errors.title = 'title is required.';
    } else if (typeof title !== 'boolean') { // *** VALIDATION CHANGE HERE ***
        isValid = false;
        errors.title = 'title must be a boolean (true or false).';
    }
    
    // If validation fails, send a 400 Bad Request response
    if (!isValid) {
        console.log('PUT request failed due to validation errors.');
        return res.status(400).json({ 
            message: 'Validation failed', 
            errors: errors 
        });
    }

    // --- Update the Data ---
    apiData.script_number = script_number;
    apiData.title = title; // Storing the boolean value

    console.log('POST request successful. Data updated.');

    // Send the updated data back to the client
    res.json({
        message: 'Data successfully updated',
        data: apiData
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`- GET: http://localhost:${port}/api/data (To fetch the variables)`);
    console.log(`- POST: http://localhost:${port}/api/data (To replace the variables)`);
});