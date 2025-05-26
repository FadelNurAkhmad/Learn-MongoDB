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
// i : Regex menjadi incase sensitive, akan mencari baik itu huruf besar atau kecil
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

// select * from products order by category asc : 1, name desc : -1
db.products.find({}).sort({
  category: 1,
  name: -1,
});

// update one syntax
db.customers.updateOne(
  {}, // filter
  {}, // update
  {} // options
);

// update many syntax
db.customers.updateMany(
  {}, // filter
  {}, // update
  {} // options
);

// replace one syntax
db.customers.replaceOne(
  {}, // filter
  {}, // update
  {} // options
);

// update products set category = "food" where _id = 1
db.products.updateOne(
  {
    _id: 1,
  },
  {
    $set: {
      category: "food",
    },
  }
);

// update products set category = "food" where _id = 2
db.products.updateOne(
  {
    _id: 2,
  },
  {
    $set: {
      category: "food",
    },
  }
);

// update products set tags = ["food"] where category = "food" and tags is null
db.products.updateMany(
  {
    $and: [{ category: { $eq: "food" } }, { tags: { $exists: false } }],
  },
  {
    $set: {
      tags: ["food"],
    },
  }
);

// insert wrong document
db.products.insertOne({
  _id: 9,
  name: "Ups Salah",
  wrong: "Salah Lagi",
});

// replaceOne() Mengubah total satu document dengan document baru
// replace document with id 9
db.products.replaceOne(
  {
    _id: 9,
  },
  {
    name: "Adidas Sepatu Lari Pria",
    price: new NumberLong("1100000"),
    category: "shoes",
    tags: ["adidas", "shoes", "running"],
  }
);

// update products set stock = 0
db.products.updateMany(
  {},
  {
    $set: {
      stock: 0,
    },
  }
);

// update products set stock = stock + 10, $inc = increment, use -1xx untuk mengurangi
db.products.updateMany(
  {},
  {
    $inc: {
      stock: 10,
    },
  }
);

// alter table customers change name to full_name
db.customers.updateMany(
  {},
  {
    $rename: {
      name: "full_name",
    },
  }
);

// update customers set wrong = 'Ups'
db.customers.updateMany(
  {},
  {
    $set: {
      wrong: "ups",
    },
  }
);

// alter table customers drop column wrong
db.customers.updateMany(
  {},
  {
    $unset: {
      wrong: "",
    },
  }
);

// update products set lastModifiedDate = current_date()
db.products.updateMany(
  {},
  {
    $currentDate: {
      lastModifiedDate: {
        $type: "date",
      },
    },
  }
);

// update products set ratings = [90, 80, 70]
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);

// update first element of array, query must include array fields, Array $ Operator
db.products.updateMany(
  {
    ratings: 90,
  },
  {
    $set: {
      "ratings.$": 100,
    },
  }
);

// update all element of array to 100, Array $[] Operator
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.$[]": 100,
    },
  }
);

// update products set ratings = [90, 80, 70]
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);

// update element of array based on arrayFilters, Array $[<identifier>] Operator
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.$[element]": 100,
    },
  },
  {
    arrayFilters: [{ element: { $gte: 80 } }],
  }
);

// update element of array with given index, Array <index> Operator
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.0": 50,
      "ratings.1": 60,
    },
  }
);

// add "popular" to array if not exists, Array $addToSet Operator
db.products.updateOne(
  {
    _id: 1,
  },
  {
    $addToSet: {
      tags: "popular",
    },
  }
);

db.products.find({ _id: 1 });

// remove first element of array, Array $pop Operator
db.products.updateOne(
  {
    _id: 1,
  },
  {
    $pop: {
      ratings: -1,
    },
  }
);

db.products.find({ _id: 2 });

// remove last element of array, Array $pop Operator
db.products.updateOne(
  {
    _id: 2,
  },
  {
    $pop: {
      ratings: 1,
    },
  }
);

// update products set ratings = [90, 80, 70]
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);

// Array $pull, $push dan $pushAll Operator
// remove all element where ratings >= 80
db.products.updateMany(
  {},
  {
    $pull: {
      ratings: {
        $gte: 80,
      },
    },
  }
);

db.products.find();

// add 100 to ratings
db.products.updateMany(
  {},
  {
    $push: {
      ratings: 100,
    },
  }
);

// add 100 to ratings
db.products.updateMany(
  {},
  {
    $push: {
      ratings: 0,
    },
  }
);

// remove element 100
db.products.updateMany(
  {},
  {
    $pullAll: {
      ratings: [100, 0],
    },
  }
);

// add 100, 200, 300 to ratings, $each untuk menambahkan multiple element
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [100, 200, 300],
      },
    },
  }
);

// add trending, popular to tags, $each untuk menambahkan multiple element
db.products.updateMany(
  {},
  {
    $addToSet: {
      tags: {
        $each: ["trending", "popular"],
      },
    },
  }
);

// add "hot" in position 1
db.products.updateMany(
  {},
  {
    $push: {
      tags: {
        $each: ["hot"],
        $position: 1,
      },
    },
  }
);

db.products.find();

// add all elements, and sort descending
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [100, 200, 300, 400, 500],
        $sort: -1,
      },
    },
  }
);

// add all elements, but limit with slice from behind
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [100, 200, 300, 400, 500],
        $slice: -3,
      },
    },
  }
);

// add all elements, and sort descending, but limit with slice from front
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [100, 200, 300, 400, 500],
        $slice: 10,
        $sort: -1,
      },
    },
  }
);

// Insert spammer document
db.customers.insertOne({
  _id: "spammer",
  full_name: "Spammer",
});

// Delete document by _id
db.customers.deleteOne({
  _id: "spammer",
});

// Insert many spammer documents
db.customers.insertMany([
  {
    _id: "spammer1",
    full_name: "Spammer1",
  },
  {
    _id: "spammer2",
    full_name: "Spammer2",
  },
  {
    _id: "spammer3",
    full_name: "Spammer3",
  },
]);

// Delete many documents, where id like "%spammer%"
db.customers.deleteMany({
  _id: {
    $regex: "spammer",
  },
});

// bulkWrite(), Melakukan operasi write (insert, update, delete) banyak secara sekaligus

db.customers.bulkWrite([
  {
    insertOne: {
      document: {
        _id: "rarjo",
        full_name: "Rarjo",
      },
    },
  },
  {
    insertOne: {
      document: {
        _id: "raharjo",
        full_name: "Raharjo",
      },
    },
  },
  {
    updateMany: {
      filter: {
        _id: {
          $in: ["parjo", "rarjo", "raharjo"],
        },
      },
      update: {
        $set: {
          full_name: "Parjo Raharjo",
        },
      },
    },
  },
]);

// Create index at category in products collection, 1 untuk ascending
db.products.createIndex({
  category: 1,
});

// Get all indexes in products collection
db.products.getIndexes();

// Menghapus index di collection
db.products.dropIndex("category_1");

// Find products by category (will use index)
db.products.find({
  category: "food",
});

// debugging with index, stage: 'IXSCAN' is use index
db.products
  .find({
    category: "food",
  })
  .explain();

db.products
  .find({})
  .sort({
    category: 1,
  })
  .explain();

// debugging without index, stage: 'COLLSCAN', is not use index
db.products
  .find({
    tag: "Laptop",
  })
  .explain();

// Create index at stock and tags in products collection, Compound Indexes
// index name : stock_1_tags_1
// Jika kita buat compound index (a, b, c),
// artinya kisa bisa mencari menggunakan query a, a b, dan a b c

db.products.createIndex({
  stock: 1,
  tags: 1,
});

// Get all indexes in products collection
db.products.getIndexes();

// Find products by stock and tags (will use index)
db.products.find({
  stock: 10,
  tags: "popular",
});

// debug with index
// stage: 'IXSCAN',
db.products
  .find({
    stock: 10,
  })
  .explain();

// stage: 'IXSCAN',
db.products
  .find({
    stock: 10,
    tags: "popular",
  })
  .explain();

// Find : stock or stock, tags = use index
// F
//
// ind : tags or name, stock = not use index

// debug without index
// stage: 'COLLSCAN',
db.products
  .find({
    tags: "popular",
  })
  .explain();

// stage: 'COLLSCAN',
db.products
  .find({
    name: "samsung",
    tags: "popular",
  })
  .explain();

// Text Index
// create index text
db.products.createIndex(
  {
    name: "text",
    category: "text",
    tags: "text",
  },
  {
    weights: {
      name: 10,
      category: 5,
      tags: 1,
    },
  }
);
// Weight, bobot untuk prioritas pencarian

// get index
db.products.getIndexes();

// search use text index
// search products with text "mie"
db.products.find({
  $text: {
    $search: "mie",
  },
});

// search products with text "mie" OR "laptop"
db.products.find({
  $text: {
    $search: "mie laptop",
  },
});

// search products with text "mie sedap"
db.products.find({
  $text: {
    $search: '"mie sedap"',
  },
});

// search products with text "mie" and NOT "sedap"
db.products.find({
  $text: {
    $search: "mie -sedap",
  },
});

// Debugging query optimization
db.products
  .find({
    $text: {
      $search: "mie -sedap",
    },
  })
  .explain();

// Meta Operator
db.products.find(
  {
    $text: {
      $search: "mie",
    },
  },
  {
    searchScore: {
      $meta: "textScore",
    },
  }
);

// membuat wildcard index
db.customers.createIndex({
  "customFields.$**": 1,
});

// mengambil index
db.customers.getIndexes();

// Insert many customers
db.customers.insertMany([
  {
    _id: "budi",
    full_name: "Budi",
    customFields: {
      hobby: "Gaming",
      university: "Universitas Belum Ada",
    },
  },
  {
    _id: "rully",
    full_name: "Rully",
    customFields: {
      ipk: 3.2,
      university: "Universitas Belum Ada",
    },
  },
  {
    _id: "rudi",
    full_name: "Rudi",
    customFields: {
      motherName: "Tini",
      passion: "Enterpreneur",
    },
  },
]);

// Debug wildcard index
db.customers
  .find({
    "customFields.passion": "Enterpreneur",
  })
  .explain();

db.customers
  .find({
    "customFields.ipk": 3.2,
  })
  .explain();

db.customers
  .find({
    "customFields.hobby": "Gaming",
  })
  .explain();

// TTL singkatan dari Time To Live, yaitu waktu untuk hidup
// Proses background tersebut berjalan setiap 60 detik sekali
// Create session collection
db.createCollection("sessions");

// create TTL index
db.sessions.createIndex(
  {
    createdAt: 1,
  },
  {
    expireAfterSeconds: 10,
  }
);

// mengambil index
db.sessions.getIndexes();

// Will expire after 10 seconds, but background job runs every 60 seconds
db.sessions.insertOne({
  _id: 1,
  session: "Session 1",
  createdAt: new Date(),
});

// Unique Index memastikan bahwa field-field di index tersebut tidak menyimpan data duplicate
// Create unique index in email
// sparse : untuk mengabaikan apabila terdapat data NULL
db.customers.createIndex(
  {
    email: 1,
  },
  {
    unique: true,
    sparse: true,
  }
);

db.customers.getIndexes();

// update customers set email = ? where _id = ?
db.customers.updateOne(
  {
    _id: "parjo",
  },
  {
    $set: {
      email: "parjo@example.com",
    },
  }
);

// error duplicate email
db.customers.updateOne(
  {
    _id: "joko",
  },
  {
    $set: {
      email: "parjo@example.com",
    },
  }
);

// Create unique index in full_name
// Case Insensitive -> strength: 2, case sensitive -> strength : 1,
// Default, saat kita membuat index, maka data akan disimpan sebagai case sensitive
db.customers.createIndex(
  {
    full_name: 1,
  },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

// not using index
db.customers.find({
  full_name: "parjo Raharjo",
});

// using index, Case Insensitive -> strength: 2
db.customers
  .find({
    full_name: "PARJO RAHARJO",
  })
  .collation({
    locale: "en",
    strength: 2,
  });

// Partial : agar index hanya digunakan ketika kita menggunakan kriteria tertentu ketika melakukan query
// create partial index
db.products.createIndex(
  {
    price: 1,
  },
  {
    partialFilterExpression: {
      stock: {
        $gt: 0,
      },
    },
  }
);

db.products.getIndexes();

// not use partial index
db.products.find({
  price: 2500,
});

// debug query with partial index
db.products.find({
  price: {
    $eq: 2500,
  },
  stock: {
    $gt: 0,
  },
});

// Admin User Security
// switch to database admin
use admin;

// create admin user
db.createUser({
  user: 'mongo',
  pwd: 'mongo',
  roles: [
    'userAdminAnyDatabase',
    'readWriteAnyDatabase'
  ]
});

"./bin/mongod --auth --dbpath=lokasi/data/"
"./bin/mongosh mongodb://mongo:mongo@localhost:27017/belajar?authSource=admin"

use admin;

// Create user with access read only
db.createUser({
  user: "contoh",
  pwd: "contoh",
  roles: [
    { role: "read", db: "test" }
  ]
});

// Create user with access read write
db.createUser({
  user: "contoh2",
  pwd: "Contoh2",
  roles: [
    { role: "readWrite", db: "test" }
  ]
});

"mongodb://contoh:contoh@localhost:27017/test?authSource=admin"

"mongodb://contoh2:Contoh2@localhost:27017/test?authSource=admin"

// Get all users
db.getUsers();

// Change password for user contoh
db.changeUserPassword("contoh", "rahasia");
"mongodb://contoh:rahasia@localhost:27017/test?authSource=admin"

db.changeUserPassword("contoh2", "contoh2");
"mongodb://contoh2:contoh2@localhost:27017/test?authSource=admin"

// Drop user contoh
db.dropUser("contoh");

// Update user
db.updateUser("contoh2", {
  roles: [
    { role: "readWrite", db: "test" },
    { role: "readWrite", db: "belajar" }
  ]
});

// Role
// create role with custom privileges
db.createRole({
  role: "session_management",
  privileges: [
    {
      resource: {
        db: "belajar",
        collection: "sessions"
      },
      actions: ["insert"]
    }
  ],
  roles: [
    {
      role: "read",
      db: "belajar"
    }
  ]
});

// show all roles with privileges
db.getRoles({ showPrivileges: true });

// create user with custom role
db.createUser({
  user: "parjo",
  pwd: "parjo",
  roles: ["session_management"]
});

"mongodb://parjo:parjo@localhost:27017/belajar?authSource=admin"

// login using user parjo
// find sessions (success)
// only access collection "sessions"
db.sessions.find();

// insert session (success)
db.sessions.insertOne({
  _id: "test",
  name: "test"
});

// delete session (error)
db.sessions.deleteOne({
  _id: "test"
});

// update session (error)
db.sessions.updateOne({
  _id: "test"
}, {
  $set: {
    name: "ubah"
  }
});

bin/mongodump --uri="mongodb://mongo:mongo@localhost:27017/belajar?authSource=admin" --out=backup-dump

bin/mongoexport --uri="mongodb://mongo:mongo@localhost:27017/belajar?authSource=admin" --collection="customers" --out=customers.json

bin/mongorestore --uri="mongodb://mongo:mongo@localhost:27017/belajar_restore?authSource=admin" --dir=backup-dump/belajar

bin/mongoimport --uri="mongodb://mongo:mongo@localhost:27017/belajar_import?authSource=admin" --collection="customers" --file=customers.json