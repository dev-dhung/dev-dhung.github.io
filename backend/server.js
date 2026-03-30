const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ['http://localhost:4200', 'http://localhost:3000'] }));
app.use(express.json());

// Store messages in memory (replace with DB in production)
const messages = [];

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const entry = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    date: new Date().toISOString(),
  };

  messages.push(entry);
  console.log(`New contact message from ${entry.name} (${entry.email})`);

  res.json({ success: true, message: 'Message received successfully' });
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Serve Angular build in production
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist', 'frontend', 'browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'frontend', 'browser', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
