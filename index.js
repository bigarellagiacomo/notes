import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let notes = [
  {
    id: '1',
    content: 'HTML is easy',
    important: true,
  },
  {
    id: '2',
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: '3',
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

const getMaxId = () => {
  const ids = notes.map((note) => Number(note.id) || 0);
  const next = Math.max(0, ...ids) + 1;
  return String(next);
};

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  note ? res.json(note) : res.status(404).end();
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post('/api/notes', (req, res) => {
  const { content, important } = req.body || {};
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'content is required' });
  }

  const newNote = { content, important: !!important, id: getMaxId() };
  notes = [newNote, ...notes];
  console.log('Added note', newNote);
  console.res.status(201).json(newNote);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('server running on port', PORT);
});
