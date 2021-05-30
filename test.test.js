require('./index');
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('./src/app');
var expect = chai.expect;


describe('Testing endpoint App Mercado Libre', function() {


  it('Get product details from an existing identifier',  function(done) { 
    chai.request(app) .get('/api/items/MLA910960311') .end(function(err, res)
    { 
      expect(res).to.have.status(200);
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
  }).timeout(10000);

  it('Get product details from an identifier that does not exist',  function(done) { 
    chai.request(app) .get('/api/items/12345') .end(function(err, res)
    { 
      expect(res).to.have.status(404);
      done(); 
    }); 
  }).timeout(10000);

  it('get results from a successful search ',  function(done) { 
    chai.request(app) .get('/api/items?q=huawei') .set({quantity: 2}) .end(function(err, res)
    { 
      expect(res).to.have.status(200);
      expect(res).be.json;
      expect(res.body).to.have.property('author');
      expect(res.body.author).to.have.property('name');
      expect(res.body.author).to.have.property('lastname');
      expect(res.body).to.have.property('categories');
      expect(res.body.categories).to.be.a('array');
      expect(res.body).to.have.property('items');
      expect(res.body.items).to.be.a('array');
      expect(res.body.items.length).to.equal(2);
      done(); 
    }); 
  }).timeout(10000);

  it('get results from an unsuccessful search ',  function(done) { 
    chai.request(app) .get('/api/items?q=jdlfajslñdajsñdljfañlsdfñjasf') .set({quantity: 2}) .end(function(err, res)
    { 
      expect(res).to.have.status(400);
      done(); 
    }); 
  }).timeout(10000);
})