const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const fruits = []; // Sample data to store fruits

// GET all fruits
app.get('/fruit/all', (req, res) => {
  res.json(fruits);
});

// GET fruit by id
app.get('/fruit/id/:id', (req, res) => {
  const id = req.params.id;
  const fruit = fruits.find((f) => f.id === id);
  if (fruit) {
    res.json(fruit);
  } else {
    res.status(404).json({ message: 'Fruit not found' });
  }
});

app.get('/api/fruit/name/:name', (req, res) => {
    const { name } = req.params;
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() === name.toLowerCase());
  
    if (fruit) {
      res.json(fruit);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });

// Update a fruit by ID (PUT method)
app.put('/fruit/id/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    // Check if the fruit already exists
    const existingFruit = fruits.find((f) => f.name.toLowerCase() === name.toLowerCase());
    if (existingFruit) {
      res.status(409).json({ message: 'Fruit already exists' });
    } else {
      const fruitIndex = fruits.findIndex((f) => f.id === parseInt(id));
      if (fruitIndex !== -1) {
        fruits[fruitIndex].name = name;
        res.json({ message: 'Fruit updated successfully', fruit: fruits[fruitIndex] });
      } else {
        res.status(404).json({ message: 'Fruit not found' });
      }
    }
  });
  

// DELETE a fruit by id
app.delete('/fruit/id/:id', (req, res) => {
  const id = req.params.id;
  const index = fruits.findIndex((f) => f.id === id);

  if (index !== -1) {
    fruits.splice(index, 1);
    res.json({ message: 'Fruit deleted successfully' });
  } else {
    res.status(404).json({ message: 'Fruit not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
