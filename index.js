
const express = require('express') 
const cors = require('cors');
const app = express()  


// Help connect to MongoDB database 
const mongoose = require('mongoose');
const { render, json } = require('express/lib/response');
const { default: axios } = require('axios');

require('dotenv').config();

// Set Port 
const port = process.env.PORT || 5000;

// View engine 
app.set("view engine", "ejs")

// Satic files 
app.use(express.static("public"))

// Incase of external client 
// app.use(cors({ origin: 'http://localhost:5000' }));

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
const stripeSessionId = ""

// List of items we are selling (database or JSON file)
const storeItems = new Map([
  [1, { priceInCents: 1000, tittle: "Learn React Today" }],
  [2, { priceInCents: 1500, tittle: "Learn CSS Today" }],
])


// cart items here 
const items = [ 
  { id: 1, quantity: 2 },
  { id: 2, quantity: 3 },
]

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.tittle,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })
    console.log(session)
    res.json({ url: session.url })

  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
  
app.get("/success", async (req, res) => {
  try {  
    const options ={
      headers: {'Authorization': 'Bearer sk_test_SM2z6QB6POe73q1ODaWbseD0008FLkWplY'}
    }

    const getSession = await axios.get("https://api.stripe.com/v1/checkout/sessions/cs_test_b1g0SplvZoiYPvVg1zWsjRUCCnOi25ojiGW4E3R5ly7zAhfxJfKnpF59vo",options)
    .then(res => res.data) 
    console.log(
      "Total payment: "+getSession.currency +" "+ getSession.amount_total +" "+
      "Payment type: "+getSession.payment_method_types+" "+
      "Payment Status: "+getSession.payment_status 
    )
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

app.get("/",(req, res) => {
  res.render('index')
})
// Port 
app.listen(port)