
const express = require('express') 
const cors = require('cors');
const app = express()  


// Help connect to MongoDB database 
const mongoose = require('mongoose');

require('dotenv').config();

// Set Port 
const port = process.env.PORT || 5000;


app.use(cors({ origin: 'http://localhost:5000' }));

// parse form data
app.use(express.urlencoded({extended: false}))

// Parse Json 
app.use(express.json()) 


// Connection String to express atlas and Environment variable.
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
  
    useNewUrlParser: true, useUnifiedTopology: true 

  },err => { 
    if(err){
        console.log('Error un able Connected to MongoDB!!!')
    }
    else{
        console.log('Connected to MongoDB!!!')
    }
    }
)

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully"); 
})


// Setup Stripe
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

// List of items we are selling (database or JSON file)
const storeItems = new Map([
  [1, { priceInCents: 10000, tittle: "Learn React Today" }],
  [2, { priceInCents: 15000, tittle: "Learn CSS Today" }],
])

// Post request for /create-checkout-session
app.post("/create-checkout-session", async (req, res) => {
    try {
      // Create a checkout session with Stripe
      const session = await stripe.checkout.sessions.create({
        
        payment_method_types: ["card"],

        // For each item use the id to get it's information
        // Take that information and convert it to Stripe's format
        line_items: req.body.items.map(({ id, quantity }) => {
          console.log(storeItems.get(id).tittle)
          const storeItem = storeItems.get(id)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: quantity,
          }
        }),
        // Payment type  
        mode: "payment",

        //  CLIENT_URL
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      })
      
      res.json({ url: session.url })
    } catch (e) {
      // If there is an error send it to the client
      res.status(500).json({ error: e.message })
    }
  }) 
  
app.get("/success", (req, res) => {
  try {   
    res.json("success") 
  } 
  catch (error) {
    res.json(error)
  }
  
})

app.get("/cancle",(req, res) => { 
  try {   
    res.json("cancled") 
  } 
  catch (error) {
    res.json(error)
  }
})

// Port 
app.listen(port)