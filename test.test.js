require('./index');
const chai = require('chai'); 
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('./src/app');
const expect = chai.expect;

const timeout = 10000;
const quantity = 2;
const code200 = 200;
const code400= 400;
const code404 = 404;

describe('Testing endpoint App Mercado Libre', function () {


  it('Get product details from an existing identifier', function (done) {
    chai.request(app).get('/api/items/MLA910960311').end(function (err, res) {
      expect(res).to.have.status(code200);
      expect(res).be.json;
      expect(res.body).to.have.property('author');
      expect(res.body.author).to.have.property('name');
      expect(res.body.author).to.have.property('lastname');
      expect(res.body).to.have.property('item');
      expect(res.body.item).to.have.property('title');
      expect(res.body.item).to.have.property('price');
      expect(res.body.item.price).to.have.property('currency');
      expect(res.body.item.price).to.have.property('amount');
      expect(res.body.item.price).to.have.property('decimals');
      expect(res.body.item).to.have.property('picture');
      expect(res.body.item).to.have.property('condition');
      expect(res.body.item).to.have.property('free_shipping');
      expect(res.body.item).to.have.property('sold_quantity');
      expect(res.body.item).to.have.property('description');
      done();
    });
  }).timeout(timeout);

  it('Get product details from an identifier that does not exist', function (done) {
    chai.request(app).get('/api/items/12345').end(function (err, res) {
      expect(res).to.have.status(code404);
      done();
    });
  }).timeout(timeout);

  it('get results from a successful search ', function (done) {
    chai.request(app).get('/api/items?q=huawei').set({ quantity }).end(function (err, res) {
      expect(res).to.have.status(code200);
      expect(res).be.json;
      expect(res.body).to.have.property('author');
      expect(res.body.author).to.have.property('name');
      expect(res.body.author).to.have.property('lastname');
      expect(res.body).to.have.property('categories');
      expect(res.body.categories).to.be.a('array');
      expect(res.body).to.have.property('items');
      expect(res.body.items).to.be.a('array');
      expect(res.body.items.length).to.equal(quantity);
      done();
    });
  }).timeout(timeout);

  it('get results from an unsuccessful search ', function (done) {
    chai.request(app).get('/api/items?q=jdlfajslñdajsñdljfañlsdfñjasf').set({ quantity }).end(function (err, res) {
      expect(res).to.have.status(code400);
      done();
    });
  }).timeout(timeout);
});
