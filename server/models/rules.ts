import * as mongoose from 'mongoose';

const RulesSchema = new mongoose.Schema({
  type: String,
  adType: String,
  min: Number,
  for: Number,
  price: Number
});

export default RulesSchema;
