const express = require('express');
const app = express();
const port = 8080;
app.get('/', (req, res) => res.send('H_M is Alive!'));

app.listen(port, () => console.log(`H_M is listening to http://localhost:${port}`));
