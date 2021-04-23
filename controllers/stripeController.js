// const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51IgW8cIXwT38my0aJiBhw4YHO8xtVt49kOEV7NONO251J7TaZBhW402AUj0s7FMYdgP0ojiq4CnP5WX5q5qChrPI00yochtDIm"); 
const { uuid } = require('uuidv4'); 
const userDataMapper = require('../dataMappers/userDataMapper');
var jwtUtils = require('../utils/jwt'); 

const app = express();

app.use(express.json());
// app.use(cors());
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
 };
  app.use(allowCrossDomain);

module.exports = {

    stripeCheckout: async function(req, res, next) {

    try {
        const { product, email } = req.body;
        const checkEmail = await userDataMapper.findUser(email); 

        if (checkEmail) {

            // On fait la somme de tout les produits et on la stocke
            const allProductPrice = product.map(item => item.price).reduce((memo, val) => memo + val)
        
    
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

        const plan = await stripe.plans.create({
            amount: 1500,
            currency: 'eur',
            interval: 'month',
            product: 'prod_JLlNaYM6K2gD5p',  // ID PRODUCT DE L'ABONNEMENT PAR MOIS
            });
        
        try {
            const { email, payment_method } = req.body; 
            const checkEmail = await userDataMapper.findUser(email); 

            if (checkEmail) {

                    const customer = await stripe.customers.create({
                        payment_method: payment_method,
                        email: email,
                        invoice_settings: {
                            default_payment_method: payment_method,
                        },
                    });
                    
                    console.log('JE SUIS APRES LE CUSTOMER');
                    
                    const subscription = await stripe.subscriptions.create({
                        customer: customer.id,
                        items: [{price: 'price_1IgtTzIXwT38my0apodcr4Yn'}], // FONCTIONNEL : price_1IgtTzIXwT38my0apodcr4Yn
                        cancel_at_period_end: true
                       // expand: ['latest_invoice.payment_intent']
                    }); 

                    
                            
                console.log(subscription)
                
                //const status = subscription['latest_invoice']['payment_intent']['status']
                //const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
                // console.log('status', status);
                // console.log('client_secret', client_secret)
                
                if(subscription.status === 'active') { //.status === 'active'
                    const subscriber = await userDataMapper.subscriber(email);
                    await userDataMapper.subscriptionEnd(subscription.current_period_end, email);
                    console.log('je passe par ici')
                    res.json({
                        // 'client_secret': client_secret, 
                        // 'status': status,
                        'role': subscriber.role,
                        'userId': subscriber.id,
                        'first_name': subscriber.first_name,
                        'last_name': subscriber.last_name,
                        'email': subscriber.email,
                        'pseudo': subscriber.pseudo,
                        'isadmin': subscriber.isadmin,
                        'token': jwtUtils.generateTokenForUser(subscriber),
                        'current_period_end': subscription.current_period_end,
                        'status': subscription.status
                });
                }
            } else {
                
                return res.status(400).json({errors :[`Utilisateur introuvable`]});
            }
        } catch(error) {
            next(error);
        } 
    
    }, 
}
    // cancelSub: async function(req, res, next) {

    //     try {

    //         const email = req.body.email
    //         const user = await userDataMapper.findUser(email); 
            
    //         if (email === user.email) {

    //             const deleted = await stripe.subscriptions.del(

    //                 user.sub_id
    //              );
                
    //         } else {
    //             return res.status(400).json({errors :[`Utilisateur introuvable`]});
    //         }

    //     } catch(error) {
    //         next();
    //     }

    // }
