const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const filter_category = process.env.FILTER_CATEGORY;
const api_ml_search = process.env.API_MERCADO_LIBRE_SEARCH;
const api_ml_product_detail = process.env.API_MERCADO_LIBRE_PRODUCT_DETAIL;
const path_product_description = process.env.PATH_PRODUCT_DESCRIPTION;
const name = 'N/A';
const lastname = 'N/A';
const code500 = 500;
const description500 = 'Internal Server Occured';

app.use(cors());
app.use(express.json());

app.get('/api/items/', async (req, res) => {
  const url = api_ml_search + req.query.q;

  try {
    console.log(url);
    const response = await axios.get(url);
    const data = response.data;

    const categories = [];
    const first_filter = data.filters.find(element => element.id === filter_category);
    if (first_filter)
      first_filter.values.find(element => element.path_from_root.forEach(element => categories.push(element.name)));

    const items = [];
    data.results.forEach(element => items.push(
      {
        id: element.id,
        title: element.title,
        price: {
          currency: element.currency_id,
          amount: element.available_quantity,
          decimals: formatterPeso.format(element.price),
        },
        picture: element.thumbnail,
        condition: element.condition,
        free_shipping: element.shipping.free_shipping,
        state_name: element.address.state_name,
      }
    ));

    const json = {
      author: {
        name: name,
        lastname: lastname,
      },
      categories: categories,
      items: items,
    };

    res.json(json);
  } catch (error) {
    console.log(error);
    if (error && error.response && error.response.status) {
      res.status(error.response.status).send(error.response.statusText);
    }
    else {
      res.status(code500).send(description500);
    }
  }
});

app.get('/api/items/:id', async (req, res) => {
  const url = api_ml_product_detail + req.params.id;
  const description = await getDescription(req.params.id);

  try {
    const response = await axios.get(url);
    const data = response.data;
    const json = {
      author: {
        name: name,
        lastname: lastname,
      },
      item: {
        id: data.id,
        title: data.title,
        price: {
          currency: data.currency_id,
          amount: data.available_quantity,
          decimals: formatterPeso.format(data.price),
        },
        picture: data.pictures[0].url,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
        description: description,
      }
    };
    res.json(json);
  } catch (error) {
    console.log(error);
    if (error && error.response && error.response.status) {
      res.status(error.response.status).send(error.response.statusText);
    }
    else {
      res.status(code500).send(description500);
    }
  }
});

const getDescription = async (id) => {
  const url = api_ml_product_detail + id + path_product_description;
  try {
    const response = await axios.get(url);
    return response.data.plain_text;
  } catch (error) {
    console.log(error);
    return '';
  }
};

const formatterPeso = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  useGrouping: true,
});

app.listen(port, () => {
  console.log(`web server listening over the port ${port}`);
});
