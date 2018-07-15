const express = require('express');
const app = express();
const PORT = 3001;
const assert = require('assert');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const reqPath = path.join(__dirname, './data.json');
let savedItems = JSON.parse(fs.readFileSync(reqPath, 'utf8'));

const updateItems = res => {
  fs.writeFile(reqPath, JSON.stringify(savedItems), 'utf8', function(err) {
    if(err) {
      console.log(err);
    }
    res.send('ok')
  });
}

app.get('/flights', function(req, res){
  function sortByDate(arr) {
    arr.sort(function(a,b){
      return Number(new Date(a.when)) - Number(new Date(b.when));
    });

    return arr;
  }

  res.send(sortByDate(savedItems))
})

app.post('/flights/addFlight', function(req, res){
  const newItem = req.body.flights;
  savedItems = [newItem, ...savedItems]
  updateItems(res)
  res.send('flight added')
})

app.post('/flights/remove', function(req, res){
	savedItems = savedItems.filter(item => item.noBooking !== req.body.noBooking)
  updateItems(res)
  res.send('flight removed')
})

app.listen(PORT, function () {
  console.log('Example app listening on port 3001!')
})
