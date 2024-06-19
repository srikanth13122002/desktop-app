import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Path to the database file
const dbFilePath = path.resolve(__dirname, '../db.json');

// Read submissions from the JSON file
const readSubmissions = (): any[] => {
  if (fs.existsSync(dbFilePath)) {
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

// Write submissions to the JSON file
const writeSubmissions = (submissions: any[]): void => {
  fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
};

// Endpoint to check server status
app.get('/ping', (req, res) => {
  res.json({ success: true });
});

// Endpoint to submit a new submission
app.post('/submit', (req, res) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  if (!name || !email || !phone || !github_link || !stopwatch_time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const submissions = readSubmissions();
  const newSubmission = { name, email, phone, github_link, stopwatch_time };
  submissions.push(newSubmission);
  writeSubmissions(submissions);

  res.status(201).json({ success: true, submission: newSubmission });
});

// Endpoint to read a submission by index
app.get('/read', (req, res) => {
  const { index } = req.query;
  const submissions = readSubmissions();
  const submissionIndex = parseInt(index as string, 10);

  if (isNaN(submissionIndex) || submissionIndex < 0 || submissionIndex >= submissions.length) {
    return res.status(400).json({ error: 'Invalid index' });
  }

  res.json({ success: true, submission: submissions[submissionIndex] });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
