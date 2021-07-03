const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

require("dotenv").config();

const schema = require("./schema");

const url =
  "mongodb+srv://kinuttt:Polarine001@cluster0.whrj6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then(
  (db) => {
    console.log("Database connected");
  },
  (err) => {
    console.log(err);
  }
);

const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
});
const app = express();

app.use(bodyParser.json());
app.use("*", cors());

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(
    `Server ready at http://drinkz-juja.herokuapp.com${server.graphqlPath}`
  )
);
