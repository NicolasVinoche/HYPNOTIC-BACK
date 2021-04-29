var AWS = require('aws-sdk');  

var creds = new AWS.Credentials({
    accessKeyId: 'AKIAYDMZRXLLOEPMOD7J', secretAccessKey: '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'
  }); 

  s3 = new AWS.S3({apiVersion: '2006-03-01', 
                  credentials: creds});
 
var bucketParams = {
  Bucket : 'hypnotic-peafowl',
}; 

module.exports = {

  getObject: async function(req, res, next){
    
    try {
      const list = s3.listObjects(bucketParams, function(err, data) {
        
        if(err) {
          
          return res.status(400).json({err});
        
        } else {

          for (const element of data.Contents ){
            const key = element.Key; 
            
            s3 = new AWS.S3({apiVersion: '2006-03-01', 
                              credentials: creds}); 
            
            var bucketParams = {
              Bucket : 'hypnotic-peafowl',
              Key: key
            }; 
            var name = element.Key
            var name = name.split('.');
            var name = name[0]; 

            var url = s3.getSignedUrl('getObject', bucketParams); 
            var url = url.split('?');
            var url = url[0]; 

          
          } 
          
          res.json({url, name});
        }
      });
      
    } catch (error) {
      next (error);
    }
  }()
}    