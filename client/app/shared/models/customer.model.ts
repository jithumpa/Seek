export class Customer {
  _id?: string;
  name?: string;
  rules?: Rules[] = [];
}

class Rules {
  type?: string;
}
