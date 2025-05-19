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

// insert customers documents
db.customers.insertOne({
  _id: "joko",
  name: "joko",
});

// select * from customers where _id = name
db.customers.find({
  $expr: {
    $eq: ["$_id", "$name"],
  },
});

// select * from products where name is not null and category is not null
db.products.find({
  $jsonSchema: {
    required: ["name", "category"],
  },
});

// select * from products where name is not null and type(name) = 'string' and type(price) = 'number'
db.products.find({
  $jsonSchema: {
    required: ["name"],
    properties: {
      name: { type: "string" },
      price: { type: "number" },
    },
  },
});

// select * from products where price % 5 = 0
db.products.find({
  price: {
    $mod: [5, 0],
  },
});

// select * from products where price % 1000000 = 0
db.products.find({
  price: {
    $mod: [1000000, 0],
  },
});

// select * from products where name like "%mie%"
db.products.find({
  name: {
    $regex: /mie/,
    $options: "i",
  },
});

// select * from products where name like "Mie%"
db.products.find({
  name: {
    $regex: /^Mie/,
  },
});

// select * from products where _id = name
db.customers.find({
  $where: function () {
    return this._id == this.name;
  },
});

// insert products with tags
db.products.insertMany([
  {
    _id: 6,
    name: "Logitech Wireless Mouse",
    price: new NumberLong("175000"),
    category: "laptop",
    tags: ["Logitech", "mouse", "accessories"],
  },
  {
    _id: 7,
    name: "Cooler Pad Gaming",
    price: new NumberLong("200000"),
    category: "laptop",
    tags: ["cooler", "laptop", "accessories", "fan"],
  },
  {
    _id: 8,
    name: "Samsung Curved Monitor",
    price: new NumberLong("1750000"),
    category: "computer",
    tags: ["samsung", "monitor", "computer"],
  },
]);

// select * from products where (tags = "samsung" and tags = "monitor")
db.products.find({
  tags: {
    $all: ["samsung", "monitor"],
  },
});

// select * from products where tags in ("samsung", "logitech") seperti or
db.products.find({
  tags: {
    $elemMatch: {
      $in: ["samsung", "logitech"],
    },
  },
});

// select * from products where count(tags) = 3
db.products.find({
  tags: {
    $size: 3,
  },
});

// select _id, name, category from products
// 1 : mengambil semua data field name
db.products.find(
  {},
  {
    name: 1,
    category: 1,
  }
);

// select _id, name, category, price from products
// 0 : mengambil kecuali field tags
db.products.find(
  {},
  {
    tags: 0,
  }
);

// select _id, name, tags[first] from products
db.products.find(
  {},
  {
    name: 1,
    tags: {
      $elemMatch: {
        $in: ["samsung", "logitech"],
      },
    },
  }
);

// select _id, name, tags[first] from products where tags is not null
// $ : mengembalikan data pertama yang match dengan array operator
db.products.find(
  {
    tags: {
      $exists: true,
    },
  },
  {
    name: 1,
    "tags.$": 1,
  }
);

// select _id, name, category, price, tags[0-1] from products where tags is not null
// $slice : Mengontrol jumlah data yang ditampilkan pada array
db.products.find(
  {
    tags: {
      $exists: true,
    },
  },
  {
    name: 1,
    tags: {
      $slice: 2,
    },
  }
);

// select count(*) from products
db.products.find({}).count();

// select * from products limit 4
db.products.find({}).limit(4);

// select * from products offset 2
db.products.find({}).skip(2);

// select * from products limit 4 offset 2
db.products.find({}).limit(4).skip(2);

// select * from products order by category asc, name desc
db.products.find({}).sort({
  category: 1,
  name: -1,
});
