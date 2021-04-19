// const streamDataMapper = require('../dataMappers/streamDataMapper');
const Vimeo = require('vimeo').Vimeo;
const client = new Vimeo("fcc0a0c7df7e5b36aa744328b3fe30ae43f48eac", "5+12EUWHbKSixf5qNYuSgQWXspBteS1cguDWJxxsTOgt9Y5lSIwns+4QL0RD5yf6Axd2q/1tuj9WxE8EiIiICi/F+zkIMJJdzGPs7wYpGIAU8nZKhTwrxXbHTNVI+EG7", "29d10d19c3f6550f3556934365ca36b6"
);

module.exports = {
    getStreams: async function(req, res, next) {
        try { 
            // const streams = await streamDataMapper.findAllStreams(); 
            // res.json({ data: streams });

            client.request({
                method: 'GET',
                path: '/tags/Stream/videos'
              }, function (error, body, status_code, headers) {
                res.json({ body });
              
                console.log(body);
              })
        } catch (error) {
            next(error);
        }
    }
}
