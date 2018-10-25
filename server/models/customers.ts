import * as mongoose from 'mongoose';
import RulesSchema from './rules';

/*const rulesSchema = new mongoose.Schema({
  type: String,
  adType: String,
  min: Number,
  for: Number,
  price: Number
});*/

const customerSchema = new mongoose.Schema({
  name: String,
  rules: [RulesSchema]
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
