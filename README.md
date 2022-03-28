# Stripe
Stripe checkout api 

<h5>APPP COMPONENETS INDEX:-<h5> 

1.NODE DEPENDENCIES

2.ENV

3.ROUTES/ENDPOINTS 

 
<h5>APP COMPONENETS :-<h5>

<h5>1. NODE DEPENDENCIES =========================================================================<h5>
<p>
"@paypal/checkout-server-sdk": "^1.0.3",

"axios": "^0.26.1",

"cookie-parser": "^1.4.6",

"cors": "^2.8.5",

"dotenv": "^16.0.0",

"express": "^4.17.3",

"mongoose": "^6.2.3",

"request": "^2.88.2",

"stripe": "^8.205.0"

"devDependencies": {
    "nodemon": "^2.0.15"
  }
</p>

<h5>
<h5>

1. Git ignore files ===============================================================================

      node_module

      .env

<h5>

2. env  ============================================================================
</h5>

      ATLAS_URI=mongodb+srv://<UserName>:<password>.4p1ws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

      STRIPE_PRIVATE_KEY=<secrete keye here>
      
      CLIENT_URL=http://localhost:5000
    


<h5>


3. ROUTES/ENDPOINTS (index.js) ============================================================================

 Routes:

</h5>
<p> 

3.1   Route:  /          (index)

      type: Get

      Response-:
            
            render(Index view)


3.2 Route:  /create-checkout-session 

      type: Post

      Response-:
            { 

                  "id": "cs_test_a1t2LxIKEJ9tWTDX5YeslKzIlOogXnf0Qt10SNPVlH3gskYXI0LfCU5C70",
                   "object": "checkout.session",
                   "after_expiration": null,
                   "allow_promotion_codes": null,
                   "amount_subtotal": null,
                   "amount_total": null,
                   "automatic_tax": {
                     "enabled": false,
                     "status": null
                   },
                   "billing_address_collection": null,
                   "cancel_url": "https://example.com/cancel",
                   "client_reference_id": null,
                   "consent": null,
                   "consent_collection": null,
                   "currency": null,
                   "customer": null,
                   "customer_creation": null,
                   "customer_details": null,
                   "customer_email": null,
                   "expires_at": 1648461547,
                   "livemode": false,
                   "locale": null,
                   "metadata": {},
                   "mode": "payment",
                   "payment_intent": "pi_1Dq2f62eZvKYlo2Cy1moIb0G",
                   "payment_link": null,
                   "payment_method_options": {},
                   "payment_method_types": [
                     "card"
                   ],

            }


3.3 Route:  /success 

      type: Get
  
      Response-: 

            {
                  "id": "cs_test_a1t2LxIKEJ9tWTDX5YeslKzIlOogXnf0Qt10SNPVlH3gskYXI0LfCU5C70",

                   "object": "checkout.session",

                   "after_expiration": null,

                   "allow_promotion_codes": null,

                   "amount_subtotal": null,

                   "amount_total": null,

                   "automatic_tax": {

                     "enabled": false,

                     "status": null

                   },

                   "billing_address_collection": null,

                   "cancel_url": "https://example.com/cancel",

                   "client_reference_id": null,

                   "consent": null,

                   "consent_collection": null,

                   "currency": null,

                   "customer": null,

                   "customer_creation": null,

                   "customer_details": null,

                   "customer_email": null,

                   "expires_at": 1648461547,

                   "livemode": false,

                   "locale": null,

                   "metadata": {},

                   "mode": "payment",

                   "payment_intent": "pi_1Dq2f62eZvKYlo2Cy1moIb0G",

                   "payment_link": null,

                   "payment_method_options": {},

                   "payment_method_types": [

                     "card"

                   ],

            }  

3.4 Route:  /cancle

      type: Get

      Response-:
            
            render(Index view)



</p>




