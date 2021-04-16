const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51IgW8cIXwT38my0aJiBhw4YHO8xtVt49kOEV7NONO251J7TaZBhW402AUj0s7FMYdgP0ojiq4CnP5WX5q5qChrPI00yochtDIm"); 
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

module.exports = {

    stripeCheckout: async function(req, res, next) {
        console.log('MON REQ BODY :',req.body);

        let error;
        let status;

    try {
        const { product, token } = req.body;
        // stripe.customers nous créer un token 
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        }); 

        const idempotencyKey = uuid();
        const charge = await stripe.charges.create(
            {
                amount: product.price * 100,
                currency: "EUR",
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased the ${product.name}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            },
            {
                idempotencyKey
            }
        );
        console.log("Charge:", { charge });
        status = "success";
    }   catch (error){
            console.error("Error:", error);
            status = "failure";
        }  

    res.json({ error, status });
}
}
