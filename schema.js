const { gql } = require("apollo-server-express");
const mongoose = require("mongoose");

const Product = require("./models/products").Products;
const Admin = require("./models/admins").Admins;

const typeDefs = gql`
  type Product {
    id: ID!
    name: String
    price: Int
    img: String
    category: String
    quantity: Int
    alc: Float
  }

  type Admin {
    id: ID!
    username: String
    password: String
  }

  type Query {
    getAdmins: [Admin]
    getProducts: [Product]
  }

  type Mutation {
    addAdmin(username: String!, password: String!): Admin
    addProduct(
      name: String!
      price: Int!
      img: String
      category: String!
      quantity: Int!
      alc: Float!
    ): Product
    increment(id: ID!): Product
    decrement(id: ID!): Product
    changePassword(id: ID!, password: String!): String
    editProduct(
      id: ID!
      name: String
      price: Int
      category: String
      img: String
      alc: Float
    ): Product
    deleteProduct(id: ID!): Product
  }
`;

const resolvers = {
  Query: {
    getAdmins: () => {
      return Admin.find();
    },
    getProducts: () => {
      return Product.find();
    },
  },
  Mutation: {
    addAdmin: (parent, args) => {
      const { username, password } = args;

      let newAdmin = new Admin({
        username,
        password,
      });

      return newAdmin.save();
    },
    addProduct: (parent, args) => {
      const { name, price, img, category, quantity, alc } = args;

      let newProduct = new Product({
        name,
        price,
        img,
        category,
        quantity,
        alc,
      });

      return newProduct.save();
    },
    increment: async (parent, args) => {
      console.log(args.id);

      const findQuantity = () =>
        new Promise((resolve, reject) => {
          Product.findById(args.id)
            .then((res) => {
              resolve(res.quantity);
            })
            .catch((err) => reject(err));
        });

      let new_quantity = parseInt(await findQuantity()) + 1;
      console.log(new_quantity);

      return Product.findByIdAndUpdate(args.id, { quantity: new_quantity });
    },
    decrement: async (parent, args) => {
      const findQuantity = () =>
        new Promise((resolve, reject) => {
          Product.findById(args.id)
            .then((res) => {
              resolve(res.quantity);
            })
            .catch((err) => reject(err));
        });

      let new_quantity = parseInt(await findQuantity()) - 1;
      console.log(new_quantity);

      return Product.findByIdAndUpdate(args.id, { quantity: new_quantity });
    },
    changePassword: (parent, args) => {
      return Admin.findByIdAndUpdate(args.id, {
        password: args.password,
      });
    },
    editProduct: (parent, args) => {
      const { name, price, category, img, alc } = args;

      let update = {};

      if (name !== undefined) {
        update.name = name;
      }
      if (price !== undefined) {
        update.price = price;
      }
      if (category !== undefined) {
        update.category = category;
      }
      if (img !== undefined) {
        update.img = img;
      }
      if (alc !== undefined) {
        update.alc = alc;
      }

      return Product.findByIdAndUpdate(args.id, update);
    },
    deleteProduct: (parent, args) => {
      return Product.findOneAndDelete({ _id: args.id });
    },
  },
};

exports.typeDefs = typeDefs;
exports.resolvers = resolvers;
