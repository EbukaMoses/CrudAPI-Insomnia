const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

app.use(express.json());
app.use(express.urlencoded("extended: false"));
//routes

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/blog", (req, res) => {
  res.send("Blog Page");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.json({ message: "Login Successful" });
});

app.get("/products", async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message)
    }
});
app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
    const product = await Product.findById(id)
    res.status(200).json(product)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message)
    }
})

app.post("/products", async(req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//updating a product
app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) return res.status(404).json({ message: `Product with id=${id} not found` });
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
});

//deleting a product
app.delete("/products/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) return res
          .status(404)
          .json({ message: `Product with id=${id} not found` });
          res.status(200).json(product);
          
    } catch (error) {
         console.log(error.message);
         res.status(500).json(error.message);
    }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://okoyemoses83:crud1234@cluster0.y5vrnog.mongodb.net/crudip?retryWrites=true&w=majority&appName=AtlasApp"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log("Node API app is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
