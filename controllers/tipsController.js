const Vimeo = require('vimeo').Vimeo;
const client = new Vimeo(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.ACCESS_TOKEN);

module.exports = {
    getAudioEffect: async function(req, res, next) {
        try { 
            client.request({
                method: 'GET',
                path: '/tags/Audio_effect/videos'
              }, function (error, body, status_code, headers) {
                res.json({ ...[body.data] });
              
                console.log(body, status_code);
              })
        } catch (error) {
            next(error);
        }
    },

    getMidiEffect: async function(req, res, next) {
        try { 
            client.request({
                method: 'GET',
                path: '/tags/Midi_effect/videos'
              }, function (error, body, status_code, headers) {
                res.json({ ...[body.data] });
              
                console.log(body, status_code);
              })
        } catch (error) {
            next(error);
        }
    },

    getMidiInstrument: async function(req, res, next) {
        try { 
            client.request({
                method: 'GET',
                path: '/tags/Midi_instrument/videos'
              }, function (error, body, status_code, headers) {
                res.json({ ...[body.data] });
              
                console.log(body, status_code);
              })
        } catch (error) {
            next(error);
        }
    }
}