import * as express from 'express';

import CustomerCtrl from './controllers/customer';
import AdvertisementCtrl from './controllers/ads';

export default function setRoutes(app) {

  const router = express.Router();

  const customerCtrl = new CustomerCtrl();
  const advertisementCtrl = new AdvertisementCtrl();

  // Customers
  router.route('/customers').get(customerCtrl.getAll);
  router.route('/customers/count').get(customerCtrl.count);
  router.route('/customers').post(customerCtrl.insert);
  router.route('/customers/:id').get(customerCtrl.get);
  router.route('/customers/:id').put(customerCtrl.update);
  router.route('/customers/:id').delete(customerCtrl.delete);
  router.route('/customers/checkout').post(customerCtrl.checkOut);


  // Ads
  router.route('/ads').get(advertisementCtrl.getAll);
  router.route('/ads').post(advertisementCtrl.insert);
  router.route('/ads/:id').get(advertisementCtrl.get);
  router.route('/ads/:id').put(advertisementCtrl.update);
  router.route('/ads/:id').delete(advertisementCtrl.delete);


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
