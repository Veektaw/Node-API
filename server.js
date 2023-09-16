const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./Models/productModels');
let username = encodeURIComponent("Veektaw");
let password = encodeURIComponent("vannessa");

app.use(express.json());

// This is to accept a format that is not Json
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    return res.status(200).send("Hello")
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        return res.status(201).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({})
        return res.status(200).send(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.get('/product/:id', async(req, res) => {
    try {
        const {id}  = req.params
        const product = await Product.findById(id)
        return res.status(200).send(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


app.put('/product/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)

        if (!product) {
            return res.status(404).json({message: "This product does not exist"})
        }
        const updatedProduct = await Product.findById(id)
        return res.status(200).send(updatedProduct)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.delete('/product/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id, req.body)

        if (!product) {
            return res.status(404).json({message: "This product does not exist"})
        }

        return res.status(200).json({message: "Product deleted"})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})



mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.rg9zzx6.mongodb.net/Node-API?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
    console.log('Connected to MongoDB');
    
}).catch((error) => {
    console.log(error);
})

module.exports = mongoose;