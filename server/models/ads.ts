import * as mongoose from 'mongoose';


const ads = new mongoose.Schema({
  name: String,
  id: String,
  price: Number
});

const Advertisement = mongoose.model('Advertisement', ads);

export default Advertisement;
