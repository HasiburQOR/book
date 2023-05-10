const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const books = [];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;
  const id = Math.floor(Math.random() * 1000000);
  const book = { id, title, author, publishedDate };
  books.push(book);
  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: `Book with ID ${id} was deleted.` });
  } else {
    res.status(404).json({ message: `Book with ID ${id} not found.` });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
