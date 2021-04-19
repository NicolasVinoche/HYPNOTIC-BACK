const Vimeo = require('vimeo').Vimeo;
const client = new Vimeo("fcc0a0c7df7e5b36aa744328b3fe30ae43f48eac", "5+12EUWHbKSixf5qNYuSgQWXspBteS1cguDWJxxsTOgt9Y5lSIwns+4QL0RD5yf6Axd2q/1tuj9WxE8EiIiICi/F+zkIMJJdzGPs7wYpGIAU8nZKhTwrxXbHTNVI+EG7", "29d10d19c3f6550f3556934365ca36b6"
);

client.request({
    method: 'GET',
    path: '/tags/Stream/videos'
  }, function (error, body, status_code, headers) {
    if (error) {
      console.log(error);
    }
  
    console.log(body);
  })
//client.request({
  //  method: 'PATCH',
  //  path: '/videos/537847726',
  //  query: {
   //   'name': 'Hypnotic Peafowl_Live Twitch #5 (Session Sound-Design)',
   //   'description': 'Description'
  //  }
 // }, function (error, body, status_code, headers) {
 //   console.log('The title and description has been edited.')
//  }) 


  //GET https://api.vimeo.com/users/{user_id}/videos 
  // GET https://api.vimeo.com/tags/{word}/videos
  // /videos/?uris=/videos/537847726,/videos/537840994,/videos/537841708,/videos/537843000,/videos/537844496

