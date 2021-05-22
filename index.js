
const express = require('express');
const cors = require('cors');
const app = express();
const puerto = 8008;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.json({
    message: 'Servicio corriendo',
  });
});

app.listen(puerto, function () {
  console.log(`servidor web escuchando por el puerto ${puerto}`);
});
