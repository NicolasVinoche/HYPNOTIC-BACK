const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51IgW8cIXwT38my0aJiBhw4YHO8xtVt49kOEV7NONO251J7TaZBhW402AUj0s7FMYdgP0ojiq4CnP5WX5q5qChrPI00yochtDIm"); 
const { uuid } = require('uuidv4'); 
const userDataMapper = require('../dataMappers/userDataMapper');

const app = express();

app.use(express.json());
app.use(cors());

module.exports = {

    stripeCheckout: async function(req, res, next) {

    try {
        const { product, email } = req.body;
        const checkEmail = await userDataMapper.findUser(email); 

        if (checkEmail) {

            // On fait la somme de tout les produits et on la stocke
            const allProductPrice = product.map(item => item.price).reduce((memo, val) => memo + val)
            console.log(allProductPrice)
    
            const idempotencyKey = uuid();
            const paymentIntent = await stripe.paymentIntents.create(
                {
                    amount: allProductPrice * 100,
                    currency: "EUR",
                    metadata: {integration_check: 'accept_a_payment'},
                    receipt_email: email,
                },
                {   // empêche les bugs de paiement multiple
                    idempotencyKey
                }
            );
            res.json({'client_secret': paymentIntent['client_secret']})
        } else {
            return res.status(400).json({errors :[`Utilisateur introuvable`]});
        }

    }   catch (error){
            next(error);
        }  
},

    stripeSub: async function(req, res, next) { 
        
        console.log('JE SUIS DANS LA METHODE')
        try {
            const { email, payment_method} = req.body; 
            console.log('REQ BODY :', email, payment_method);

            const customer = await stripe.customers.create({
                payment_method: payment_method,
                email: email,
                invoice_settings: {
                    default_payment_method: payment_method,
                }, 
            });

            console.log('CUSTOMER OK')

            const subscription = await stripe.subscription.create({
                customer: customer.id,
                items: [{plan: 'price_1IgtTzIXwT38my0apodcr4Yn'}],
                expand: ['latest_invoice.payment_intent']
            });

            console.log('SUBSCRIPTION OK')

            const status = subscription['latest_invoice']['payment_intent']['status']
            const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

            res.json({'client_secret': client_secret, 'status': status});
            
        } catch(error) {
            next(error);
        }
    }
}
