const { graphql } = require('graphql');
const readline = require('readline');

const mySchema = require('./schema/main');

const { MongoClient } = require('mongodb');
const assert = require('assert');

const MONGO_URL = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGO_URL, (err, db) => {
    if (err) throw err;
    assert.equal(null, err);
    console.log('Connected to MongoDB server');

    // The readline interface code
    const rli = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rli.question('Client Request: ', inputQuery => {
        // 3er arg: rootValue
        // 4th arg: contextValue
        graphql(mySchema, inputQuery, {}, { db }).then(result => {
            console.log('Server Answer :', result.data);
            db.close(() => rli.close());
        });

        rli.close();
    });
});
