// const streamDataMapper = require('../dataMappers/streamDataMapper');
const Vimeo = require('vimeo').Vimeo;
const client = new Vimeo(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.ACCESS_TOKEN);

module.exports = {
    getStreams: async function(req, res, next) {
        try { 
            // const streams = await streamDataMapper.findAllStreams(); 
            // res.json({ data: streams });

            client.request({
                method: 'GET',
                path: '/tags/Stream/videos'
              }, function (error, body, status_code, headers) {
                res.json({ ...[body.data] });
              
                console.log(body);
              })
        } catch (error) {
            next(error);
        }
    }
}
