// constantes
require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Stripe = require('stripe');


let app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))  // para trabalhar com requisições post
app.use(bodyParser.json())  // para trabalhar com requisições json


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20'
})




// rotas
app.use(cors())
app.use(bodyParser.json())
app.post('/payment-intent', async (req, res) =>{
  try{
    console.log('payment-intent')
      const { amount } = req.body

      
      const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'usd',
      });

      
      res.json({
          clientSecret: paymentIntent.client_secret
      });
  } catch (error){
      res.status(500).json({error: error.message})
  }
})

let port = process.env.PORT || 3000
app.listen(port, (req, res) => {
  console.log(`Servidor rodando na porta: ${port}`)
})
