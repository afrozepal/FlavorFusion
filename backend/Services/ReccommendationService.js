// ReccService.js
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log("Starting the script");

const generateReccommendations = async (email, likedRecipes) => {
    console.log('Inside generateReccommendations function');
    
    // Construct the absolute path to the Python script
    const pythonScriptPath = path.join(__dirname, 'GenerateReccommendations.py');
    console.log('Python Script Path:', pythonScriptPath); // Debug statement

    if (!fs.existsSync(pythonScriptPath)) {
        console.error('Python script not found:', pythonScriptPath);
        return Promise.reject('Python script not found');
    }

    return new Promise((resolve, reject) => {
        console.log('About to run Python script');
        const pythonProcess = spawn('python', [pythonScriptPath, email, JSON.stringify(likedRecipes)]);

        let dataOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            dataOutput += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error running Python script: ${data}`);
            reject(data.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Python script execution completed successfully');
                console.log('Python script output:', dataOutput); // Debug statement
                try {
                    // Clean up and parse the output
                    const cleanedOutput = dataOutput.trim();
                    let recommendations;

                    // Validate JSON output
                    if (!cleanedOutput) {
                        console.error('Empty JSON output from Python script');
                        return reject('Empty JSON output from Python script');
                    }

                    // Attempt to parse JSON
                    recommendations = JSON.parse(cleanedOutput);
                    
                    // Check if the output is an array
                    if (!Array.isArray(recommendations)) {
                        console.error('Invalid JSON output from Python script: Not an array');
                        return reject('Invalid JSON output from Python script: Not an array');
                    }

                    // Remove duplicates
                    recommendations = [...new Set(recommendations)];
                    
                    resolve(recommendations);
                } catch (error) {
                    console.error('Error parsing JSON from Python script output:', error);
                    reject(error);
                }
            } else {
                console.error(`Python script execution failed with code ${code}`);
                reject(`Python script execution failed with code ${code}`);
            }
        });
    });
};

// Export the function
module.exports = { generateReccommendations };
