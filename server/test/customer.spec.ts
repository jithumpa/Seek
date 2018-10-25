import * as chai from 'chai';
import {describe, it} from 'mocha';

process.env.NODE_ENV = 'test';
import {app} from '../app';
import Customer from '../models/customers';

chai.use(require('chai-http')).should();

describe('Customer', () => {

  beforeEach(done => {
    Customer.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for Customers', () => {

    it('should get all the customer', done => {
      chai.request(app)
        .get('/api/customers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get customers count', done => {
      chai.request(app)
        .get('/api/customers/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new customers', done => {
      const customer = new Customer({
        'name': 'Test',
        'rules': [{'type': 'PRICE_DROP', 'adType': 'premium', 'price': 119.99}, {'type': 'DEAL', 'adType': 'standout', 'min': 4, 'for': 3}]
      });
      chai.request(app)
        .post('/api/customers')
        .send(customer)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('rules');
          done();
        });
    });

    it('should get a customer by its id', done => {
      const customer = new Customer({
        'name': 'Test',
        'rules': [{'type': 'PRICE_DROP', 'adType': 'premium', 'price': 119.99}, {'type': 'DEAL', 'adType': 'standout', 'min': 4, 'for': 3}]
      });
      customer.save((error, newCustomer) => {
        chai.request(app)
          .get(`/api/customers/${newCustomer.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('rules');
            res.body.should.have.property('_id').eql(newCustomer.id);
            done();
          });
      });
    });

    it('should update a customer by its id', done => {
      const customer = new Customer({
        'name': 'Test',
        'rules': [{'type': 'PRICE_DROP', 'adType': 'premium', 'price': 119.99}, {'type': 'DEAL', 'adType': 'standout', 'min': 4, 'for': 3}]
      });
      customer.save((error, newCustomer) => {
        chai.request(app)
          .put(`/api/customers/${newCustomer.id}`)
          .send({weight: 5})
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a customer by its id', done => {
      const customer = new Customer({
        'name': 'Test',
        'rules': [{'type': 'PRICE_DROP', 'adType': 'premium', 'price': 119.99}, {'type': 'DEAL', 'adType': 'standout', 'min': 4, 'for': 3}]
      });
      customer.save((error, newCustomer) => {
        chai.request(app)
          .del(`/api/customers/${newCustomer.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


