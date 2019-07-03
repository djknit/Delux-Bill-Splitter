const express = require('express');
const app = express();
const path = require('path');


app.use(express.static('client/app'));
app.use(require('morgan')('combined'));

const PORT = process.env.PORT || 3001;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log('Server listening on PORT ' + PORT));