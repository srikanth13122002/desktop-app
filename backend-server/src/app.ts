// src/app.ts
import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

app.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  // Here you would save the submission data, possibly to a JSON file or a database
  res.json({ success: true, submission: req.body });
});

app.get('/read', (req: Request, res: Response) => {
  const index = Number(req.query.index);
  // Here you would retrieve the submission data based on the index
  // Replace this line with your actual logic to retrieve data
  res.json({ success: true, submission: { /* Actual submission data here */ } });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
