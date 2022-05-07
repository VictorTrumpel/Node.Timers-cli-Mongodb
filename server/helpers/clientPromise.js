const { MongoClient } = require("mongodb");

const clientPromise = MongoClient.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  maxPoolSize: 10,
});

module.exports.clientPromise = clientPromise;
