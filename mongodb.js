db.createCollection("customers");

db.createCollection("products");

db.createCollection("orders");

db.getCollectionNames();

db.customers.find();

db.customers.insertOne({
  _id: "parjo",
  name: "Parjo Raharjo",
});

db.products.insertMany([
  {
    _id: 1,
    name: "Indomie Ayam Bawang",
    price: new NumberLong("2000"),
  },
  {
    _id: 2,
    name: "Mie Sedap Soto",
    price: new NumberLong("2000"),
  },
]);

db.orders.insertOne({
  _id: new ObjectId(),
  total: new NumberLong("8000"),
  items: [
    {
      product_id: 1,
      price: new NumberLong("2000"),
      quantity: new NumberInt("2"),
    },
    {
      product_id: 2,
      price: new NumberLong("2000"),
      quantity: new NumberInt("2"),
    },
  ],
});

// select * from customers where _id = "parjo"
db.customers.find({
  _id: "parjo",
});

// select * from customers where name = "Parjo Raharjo"
db.customers.find({
  name: "Parjo Raharjo",
});

// select * from products where price = 2000
db.products.find({
  price: 2000,
});

// select * from orders where items.product_id = 1
db.orders.find({
  "items.product_id": 1,
});

// insert product documents
db.products.insertMany([
  {
    _id: 3,
    name: "Pop Mie Rasa Bakso",
    price: new NumberLong("2500"),
    category: "food",
  },
  {
    _id: 4,
    name: "Samsung Galaxy S9+",
    price: new NumberLong("10000000"),
    category: "handphone",
  },
  {
    _id: 5,
    name: "Acer Predator XXI",
    price: new NumberLong("25000000"),
    category: "laptop",
  },
]);

// select * from customers where _id = "parjo"
db.customers.find({
  _id: {
    $eq: "parjo",
  },
});

// select * from products where price > 2000
db.products.find({
  price: {
    $gt: 2000,
  },
});

db.products.find({
  $and: [
    {
      category: {
        $in: ["laptop", "handphone"],
      },
    },
    {
      price: {
        $gt: 10000000,
      },
    },
  ],
});

// select * from products where category in ('handphone', 'laptop') and price > 20000000
db.products.find({
  $and: [
    { category: { $in: ["handphone", "laptop"] } },
    { price: { $gt: 20000000 } },
  ],
});

// select * from products where category not in ('handphone', 'laptop')
db.products.find({
  category: {
    $not: { $in: ["handphone", "laptop"] },
  },
});

// select * from products where price between 10000000 and 20000000 and category ≠ 'food'
db.products.find({
  price: {
    $gte: 10000000,
    $lte: 20000000,
  },
  category: {
    $ne: "food",
  },
});

// select * from products where category is not null
db.products.find({
  category: {
    $exists: true,
  },
});

// select * from products where category is null
db.products.find({
  category: {
    $exists: false,
  },
});

// select * from products where type(category) = 'string'
db.products.find({
  category: {
    $type: "string",
  },
});

// select * from products where type(price) in ('int', 'long')
db.products.find({
  price: {
    $type: ["int", "long"],
  },
});
