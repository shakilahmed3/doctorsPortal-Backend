const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });

app.get('/apointment', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("doctorsPortal").collection("apointment");
        collection.find().toArray((err, documents) => {
            if (err) {
                console.log(err)
                res.status(500).send({ message: err });
            }
            else {
                res.send(documents);
            }
        });
        client.close();
    });
});


app.post('/patient', (req, res) => {
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("doctorsPortal").collection("patient");
        collection.insertOne(product, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send({ message: err });
            }
            else {
                res.send(result.ops[0]);
            }
        });
        client.close();
    });
});


app.get('/allPatient', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("doctorsPortal").collection("patient");
        collection.find().toArray((err, documents) => {
            if (err) {
                console.log(err)
                res.status(500).send({ message: err });
            }
            else {
                res.send(documents);
            }
        });
        client.close();
    });
});




const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listenting to port ', port));