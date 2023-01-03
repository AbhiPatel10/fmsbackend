const mongoose = require('mongoose');
// const routes = require("./config/config")
// import { mongo } from "./config/config";
const mongo = require("./config/config")

const mongoURI = 'mongodb+srv://' + mongo.mongo.MONGO_USERNAME + ':' + mongo.mongo.MONGO_PASSWORD + '@' + mongo.mongo.MONGO_HOST + '/' + mongo.mongo.MONGO_DBNAME + '?retryWrites=true&w=majority';
console.log(mongoURI);
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    var conn = mongoose.connection;
    conn.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
    conn.once("open", function() {
        console.log("Database connection has been established successfully.");
    });
    // mongoose.connect(mongoURI, ()=>{
    //     console.log("Connected to Mongo Successfully");
    // })
}

module.exports = connectToMongo;