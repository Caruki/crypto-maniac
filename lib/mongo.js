const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/test';
const dbname = 'crypto';
let client;

function connect() {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client.connect();
}

function close() {
  return client.close();
}

function getCollection(collectionName) {
  return client.db(dbname).collection(collectionName);
}

module.exports = { connect, close, getCollection };
