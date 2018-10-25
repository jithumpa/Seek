import Customer from '../models/customers';
import BaseCtrl from './base';
import {Checkout} from './checkout';

export default class CustomerCtrl extends BaseCtrl {
  model = Customer;


  // Get all
  checkOut = (req, res) => {
    console.dir(req.body);
    this.model.findOne({_id: req.body.id}, (err, item) => {
      if (err) {
        return console.error(err);
      }

      Checkout.init(item.rules);
      Checkout.add('Premium', req.body.Premium || 0);
      Checkout.add('Standout', req.body.Standout || 0);
      Checkout.add('Classic', req.body.Classic || 0);

      res.status(200).json({total: Checkout.total()});
    });
  }

}
