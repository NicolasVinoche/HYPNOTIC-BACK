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

            return res.json({ cart: updateCart });
        } catch (error) {
            next(error);
        }
    },
    getCart: async function (req, res, next) {
        console.log('req.headers pour check le cookie: ', req.headers)
        const userId = req.params.id 
        try {  
            const cart = await cartDataMapper.getCart(userId);
            console.log('stringCart :', cart);

            const jsonCart = JSON.parse(cart.cart); 
            console.log('JSON:', jsonCart)
            return res.json({ cart: jsonCart });
        } catch (error) {
            next(error);
        }
    }
}