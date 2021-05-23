require('dotenv').config()
const express = require('express');
const cors = require('cors');
const request = require("request");
const app = express();
const puerto = process.env.PUERTO;
const api_ml_busqueda = process.env.API_MERCADO_LIBRE_BUSQUEDA;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.json({
    message: 'Servicio corriendo',
  });
});

app.get('/api/items/', function (req, res) {
  console.log(req.query);
  console.log(api_ml_busqueda + req.query.q)
  request(api_ml_busqueda + req.query.q, (err, response, body) => {
    if (!err) {
      const respuesta_api = JSON.parse(body);
      // console.log(respuesta_api)

      const resultados = [];

      respuesta_api.results.forEach(element => resultados.push(
        {
          "id": element.id,
          "title": element.title,
          "price": {
            "currency": element.currency_id,
            "amount": element.available_quantity,
            "decimals": formatterPeso.format(element.price),
          },
          picture: element.thumbnail,
          "condition": element.condition,
          "free_shipping": element.shipping.free_shipping,
          state_name: element.address.state_name,
        }

      ));

      const respuesta = {
        author: {
          name: 'nombre',
          lastname: 'apellido',
        },
        categories: ['categoria 1', 'categoria 1', 'categoria 1'],

        items: resultados,
      };

      res.json(respuesta);
    }
  })
});

const formatterPeso = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  useGrouping: true,
})

app.listen(puerto, function () {
  console.log(`servidor web escuchando por el puerto ${puerto}`);
});
