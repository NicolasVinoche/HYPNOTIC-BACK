const cartDataMapper = require('../dataMappers/cartDataMapper'); 

module.exports = {
    cartUpdate: async function(req, res, next) {
        const cart = req.body.cart
        const user = req.params.id
        console.log('panier reqbody :', cart)
        try { 
            const cartStringed = JSON.stringify(cart);
            console.log('cartStringed', cartStringed)
             const updateCart = await cartDataMapper.updateCart(cartStringed, user);
            //  console.log(cart);

            return res.json({ data: updateCart });
        } catch (error) {
            next(error);
        }
    }
}