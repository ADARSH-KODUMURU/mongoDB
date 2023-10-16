const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const fs = require('fs');
const mongoose = require('mongoose');
const ChartData = require('./schema.js');
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/db_budget', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
});


app.use(express.json());
app.use(cors());
// Serve static files
app.use(express.static(__dirname));
app.use('/', express.static('public'));


// getData from user
app.get('/budget', async (req, res) => {
    try {
      const data = await ChartData.find();
      res.json({"myBudget":data});;
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// Send data to user
app.post('/setdata', async (req, res) => {
    console.log(req.body);
    const data={ 
        "title":req.body.title,
        "color":req.body.color ,
        "budget":req.body.budget 
    }
    try {
        console.log(data)
      const newData = new ChartData(data);
      console.log(newData)
      await newData.save();
      res.json(newData);
    } catch (err) {
      res.json({ "type":"error",error: err.message });
    }
  });

// Endpoint to serve budget.json
// app.get('/budget', (req, res) => {
//     fs.readFile('budget.json', 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send('Error reading budget.json');
//             return;
//         }
//         res.send(JSON.parse(data));
//     });
// });

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});