let express = require('express');
let app = express();
let neo4j = require('neo4j-driver');

let driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '1234Folk'));
let session = driver.session();
session._onDatabaseNameResolved('testdb');

app.get('/', async function (req, res) {
    let results = await session.run('MATCH (n) RETURN n');
    let results1 = await session.run('MATCH (tom:FRUGAL_CATEGORY) WHERE tom.name = "Accessibility" RETURN tom');
    res.send(results);
    // session
    //     .run('MATCH (n) RETURN n')
    //     .then(function (results) {
    //         console.log('sssssssssssssssssss');
    //         res.send(results);
    //     })
    //     .catch(function (err) {
    //         console.log('eeeeeeeeeeeeeeeeeee');
    //         res.send(err);
    //     });
});

app.listen('8090', function (req, res) {
    console.log('Server is successfully running');
});